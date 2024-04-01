import { Loader, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

interface loaderConfig {
  onProcess?: Function;
}

const CreateLoader = (loader: Loader, path: string, config: loaderConfig = {}) => {
  return new Promise((resolve, reject) => {
    const onLoad = texture => {
      return resolve(texture);
    };

    const onProcess = event => {
      if (config.onProcess) {
        config.onProcess(event);
      }
    };

    const onError = err => {
      return reject(err);
    };

    new TextureLoader().load(path, onLoad, onProcess, onError);
  });
};

const TextureLoaderAsync = (path: string, config: loaderConfig) => CreateLoader(new TextureLoader(), path, config);
const GLTFLoaderAsync = (path: string, config: loaderConfig) => CreateLoader(new GLTFLoader(), path, config);
const MTLLoaderAsync = (path: string, config: loaderConfig) => CreateLoader(new MTLLoader(), path, config);
const ObjLoaderAsync = (path: string, config: loaderConfig) => CreateLoader(new OBJLoader(), path, config);

export { TextureLoaderAsync, GLTFLoaderAsync, MTLLoaderAsync, ObjLoaderAsync };

import {Loader, TextureLoader} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';

interface loaderConfig {
  onProcess?: Function;
}

const CreateLoader = (loader: Loader, path: string, config: loaderConfig = {}) => {
  return new Promise((resolve, reject) => {
    const onLoad = texture => {
      return resolve(texture);
    };

    const onProcess = xhr => {
      if (config.onProcess) {
        config.onProcess(xhr);
      }
    };

    const onError = err => {
      return reject(err);
    };

    loader.load(path, onLoad, onProcess, onError);
  });
};

const TextureLoaderCommonPromise = (loader: Loader, path: string, config: loaderConfig = {}) => CreateLoader(loader, path, config);
const TextureLoaderPromise = (path: string, config: loaderConfig = {}) => CreateLoader(new TextureLoader(), path, config);
const GLTFLoaderPromise = (path: string, config: loaderConfig = {}) => CreateLoader(new GLTFLoader(), path, config);
const MTLLoaderPromise = (path: string, config: loaderConfig = {}) => CreateLoader(new MTLLoader(), path, config);
const ObjLoaderPromise = (path: string, config: loaderConfig = {}) => CreateLoader(new OBJLoader(), path, config);

export {TextureLoaderCommonPromise, TextureLoaderPromise, GLTFLoaderPromise, MTLLoaderPromise, ObjLoaderPromise};

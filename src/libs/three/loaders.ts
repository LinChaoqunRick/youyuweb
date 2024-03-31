import { TextureLoader } from 'three';

interface loaderConfig {
  onProcess?: Function;
}

const TextureLoaderAsync = (path: string, config: loaderConfig = {}) => {
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

export { TextureLoaderAsync };

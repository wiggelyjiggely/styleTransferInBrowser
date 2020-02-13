//import 'babel-polyfill';
//import * as tf from '@tensorflow/tfjs';
tf.ENV.set('WEBGL_PACK', false);  // This needs to be done otherwise things run very slow v1.0.4

class Main{
    constructor(){
        Promise.all([
            loadMobileNetStyleModel(),
            loadSeparableTransformerModel(),
        ]).then(([styleNet, transformNet]) => {
            console.log('Loaded styleNet');
            this.styleNet = styleNet;
            this.transformNet = transformNet;
        });
    }

    async  loadMobileNetStyleModel() {
        
        mobileStyleNet = await tf.loadGraphModel('./models/saved_model_style_js/model.json');
        return mobileStyleNet;
    }

    async  loadInceptionStyleModel() {
        
        inceptionStyleNet = await tf.loadGraphModel('./models/saved_model_style_inception_js/model.json');
        return inceptionStyleNet;
    }

    async  loadOriginalTransformerModel() {
        
        originalTransformNet = await tf.loadGraphModel('./models/saved_model_transformer_js/model.json');
        return originalTransformNet;
    }

    async  loadSeparableTransformerModel() {
            
        separableTransformNet = await tf.loadGraphModel('./models/saved_model_transformer_separable_js/model.json');
        return separableTransformNet;
    }

    startStyling(content,style){
        return this.styleNet.predict(tf.browser.fromPixels(style).toFloat().div(tf.scalar(255)).expandDims());
    }
}
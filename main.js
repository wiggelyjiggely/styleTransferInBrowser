//import 'babel-polyfill';
//import * as tf from '@tensorflow/tfjs';
tf.ENV.set('WEBGL_PACK', false);  // This needs to be done otherwise things run very slow v1.0.4


let styleNet = loadMobileNetStyleModel();
let transformNet = loadSeparableTransformerModel();


async function loadMobileNetStyleModel() {
    
    mobileStyleNet = await tf.loadGraphModel('models/saved_model_style_js/model.json');
    return mobileStyleNet;
}

async function loadInceptionStyleModel() {
    
    inceptionStyleNet = await tf.loadGraphModel('models/saved_model_style_inception_js/model.json');
    return inceptionStyleNet;
}

async function loadOriginalTransformerModel() {
    
    originalTransformNet = await tf.loadGraphModel('models/saved_model_transformer_js/model.json');
    return originalTransformNet;
}

async function loadSeparableTransformerModel() {
        
    separableTransformNet = await tf.loadGraphModel('models/saved_model_transformer_separable_js/model.json');
    return separableTransformNet;
}

function startStyling(content,style){
    return styleNet.predict(tf.browser.fromPixels(style).toFloat().div(tf.scalar(255)).expandDims());
}    



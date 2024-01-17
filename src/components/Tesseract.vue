<script setup>
import Tesseract from 'tesseract.js';
import { ref } from 'vue';

const { createWorker } = Tesseract;
const msg = ref('');
const image = ref('');
const status = ref(false);

function getImage () {
    console.log(image.value, '-----');
    
}
async function getOCR(image){
    // status.value = true;
    // if(!image) {
    //     return;
    // }
    console.log('------++++++');
    const worker = await createWorker('eng+chi_sim', 1, {legacyCore: true, legacyLang: true});
    const obj = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    // msg.value = text;
    console.log(obj,'------');
    status.value = false;
};

</script>

<template>
    <div class="loading" v-if="status"> 
        <div class="loading-text">
            等待文字提取中...
        </div>
    </div>
    <div class="head-search">
        <input type="text" name="FirstName" v-model="image" @change="getImage" class="input-head">
        <div class="btn-group" @click="getOCR(image)">
           获取文字
          </div>
    </div>
    <div class="ocr-box">
        <div class="ocr-image">
            <img :src="image" alt="" class="image-box">
        </div>
        <div class="ocr-value">
            {{msg}}
        </div>

    </div>
</template>

<style scoped>
.head-search {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-left: 60px;
    margin-top: 20px;
    align-items: center;
}

.input-head {
    height: 50px;
    margin-right: 20px;
    width: 75%;
    font-size: 18px;
}

.btn-group {
    width: 15%;
    height: 60px;
    background: #407fff;
    border-radius: 2px;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    line-height: 20px;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.ocr-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    margin-top: 50px;
}

.ocr-image {
    width: 45%;
    border: 1px solid #e1e1e1;
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-box {
    height: 750px;
    width: auto;
}

.ocr-value {
    height: 800px;
    width: 45%;
    color: #000;
    border: 1px solid #e1e1e1;
    overflow: scroll;
    padding: 10px;
    font-size: 16px;
}

@keyframes fade {
            0% {opacity: 1;} 
            50%  {opacity: .5;} 
            100% {opacity: 0; }
}
.loading {
    background-color: #000;
    opacity: .6;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-text {
    animation: fade 3s infinite alternate;
    color: #eee;
    font-size: 20px;
}
</style>

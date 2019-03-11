export default {
    /*
     * 资源预加载
     */
    preLoading(imgList,pcb,rcb){
        let promiseAll = [],img = [],imgTotal = imgList.length;
        let num = 0;
        let percentage = 0;
        if(window.supportWebp !== true){
            for(let item of imgList){
                if(/.webp$/i.test(item)){
                    item = item.replace('.webp','');
                }
            }
        }
        const delayTime = new Promise((resolve,reject) => {
            setTimeout(()=>{
                resolve();
            },5000)
        })
        for(let i = 0; i<imgTotal; i++ ){
            promiseAll[i] = new Promise((resolve,reject) =>{
                img[i] = new Image();
                img[i].src = imgList[i];
                img[i].onload = img[i].onerror = () => {
                    num += 1;
                    percentage = Math.floor(num * 100 /(imgTotal+1));
                    pcb(percentage);
                    resolve(img[i]);
                }

            })
        }
        promiseAll.push(delayTime);
        Promise.all(promiseAll).then((img) =>{
            rcb();
        })

    }


}

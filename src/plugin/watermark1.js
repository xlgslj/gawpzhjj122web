let  watermark = {}
watermark.bind =  (el,binding) => {
    function addWaterMarker(str,parentNode,font,textColor){// 水印文字，父元素，字体，文字颜色
        var can = document.createElement('canvas');
       // parentNode.appendChild(can);
        can.width = 800;
        can.height = 400;
        can.style.display = 'none';
        var cans = can.getContext('2d');
        //cans.rotate(1 * Math.PI / 180);
        cans.font = font || "30px 微软雅黑";
        cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
        cans.textAlign = 'left';
        cans.textBaseline = 'Middle';
        cans.fillText(str, can.width /5, can.height*4/5);
        parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
        //parentNode.style.backgroundRepeat = "repeat"
    }
    if (binding.arg) addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
}

watermark.update =  (el,binding) => {
    function addWaterMarker(str,parentNode,font,textColor){// 水印文字，父元素，字体，文字颜色
        var can = document.createElement('canvas');
        // parentNode.appendChild(can);
        can.width = 800;
        can.height = 200;
        can.style.display = 'none';
        var cans = can.getContext('2d');
        //cans.rotate(1 * Math.PI / 180);
        cans.font = font || "30px 微软雅黑";
        cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
        cans.textAlign = 'left';
        cans.textBaseline = 'Middle';
        cans.fillText(str, can.width /5, can.height*4/5);
        parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
        //parentNode.style.backgroundRepeat = "repeat"
    }
    addWaterMarker(binding.arg, el, binding.value.font, binding.value.textColor)
}

export default watermark

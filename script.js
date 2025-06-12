document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const originalImage = document.getElementById('originalImage');
    const convertedImage = document.getElementById('convertedImage');
    const ctx = convertedImage.getContext('2d');

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                // 显示原始图片
                originalImage.src = event.target.result;
                
                // 创建新图片对象用于处理
                const img = new Image();
                img.onload = () => {
                    // 设置canvas尺寸
                    convertedImage.width = img.width;
                    convertedImage.height = img.height;
                    
                    // 绘制原始图片
                    ctx.drawImage(img, 0, 0);
                    
                    // 获取图片数据
                    const imageData = ctx.getImageData(0, 0, convertedImage.width, convertedImage.height);
                    const data = imageData.data;
                    
                    // 转换为黑白
                    for (let i = 0; i < data.length; i += 4) {
                        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                        data[i] = avg;     // R
                        data[i + 1] = avg; // G
                        data[i + 2] = avg; // B
                    }
                    
                    // 将处理后的数据放回canvas
                    ctx.putImageData(imageData, 0, 0);
                };
                
                img.src = event.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    });
}); 
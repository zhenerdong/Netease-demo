/**
 * Created by andy on 2015/11/23.
 */
window.onload = function() {
    // ��ȡԪ��
    function $(id) {return document.getElementById(id);}
    var js_slider = $("js_slider");  // ��ȡ������
    var slider_main_block = $("slider_main_block");  // ����ͼƬ�ĸ���
    var imgs = slider_main_block.children;  // ������е�ͼƬ�� ��Ҫ�����Ĳ���
    var slider_ctrl = $("slider_ctrl");  // ��� ����span �� ������
    // ����Ԫ��
    // ����Сspan
    for(var i=0;i<imgs.length; i++) {

        var span = document.createElement("span");// ���� span
        span.className = "slider-ctrl-con"; // �������
        span.innerHTML = imgs.length-i;  //  6 - 0     6 - 1   // ʵ�� ���� �ķ�ʽ����
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);  // �� ���� �����ڶ������ӵ�ǰ�����
    }
    // ����ĵ�һ��Сspan  ��Ĭ�ϵ���ɫ
    var spans = slider_ctrl.children;   // �õ����е� span
    spans[1].setAttribute("class","slider-ctrl-con current");  // ��������

    var scrollWidth = js_slider.clientWidth; // �õ�����ӵĿ�� Ҳ����  ���涯���ߵľ���  310
    //  �տ�ʼ��������   ��һ��ͼƬ ����   ��������ߵ� 310 ��λ����
    for(var i = 1; i<imgs.length; i++) { // ��1 ��ʼ ��Ϊ��һ�Ų���Ҫ����

        imgs[i].style.left =  scrollWidth + "px";  // ������ �����ƶ��� 310 ��λ��
    }
    // ����������ť
    // spans �� 8����ť ���Ƕ��� span
    var iNow = 0; //  ���� ���Ʋ�������
    for(var k in spans){   //   k  ��������  spans[k]    spans[0]  ��һ��span
        spans[k].onclick = function() {
            // alert(this.innerHTML);
            if(this.className == "slider-ctrl-prev"){ // �жϵ�ǰ����������ť�ǲ��� prev
                // alert("���������ఴť");
                //  �����������ʱ�� ��ǰ������ͼƬ ���������ߵ��ұ�  ��һ�� һ���ȿ����ߵ���� ��-310����λ�ã�Ȼ���������ߵ���̨��
                animate(imgs[iNow],{left: scrollWidth});
                --iNow < 0 ?  iNow = imgs.length - 1 : iNow;
                imgs[iNow].style.left = -scrollWidth + "px";
                animate(imgs[iNow],{left: 0});
                setSquare();
            }
            else if(this.className == "slider-ctrl-next") {  // �Ҳఴť��ʼ
                autoplay();
            }
            else {
                // alert("������������span");
                // ��������Ҫ֪�����ǵ���ǵڼ���ͼƬ  --- ��õ�ǰ��������
                // alert(this.innerHTML);
                var that = this.innerHTML - 1;
                // console.log(typeof that);
                if(that > iNow) {
                    // ������ͬ�� �Ҳఴť
                    animate(imgs[iNow],{left: -scrollWidth});  // ��ǰ�������������߳�ȥ ���
                    imgs[that].style.left = scrollWidth + "px"; // ������Ǹ������� �����ߵ��Ҳ�  310
                }
                else if(that < iNow) {
                    // ������ͬ�� ��ఴť
                    animate(imgs[iNow],{left: scrollWidth});
                    imgs[that].style.left = -scrollWidth + "px";
                }
                iNow = that;  // ����ǰ��������
                animate(imgs[iNow],{left: 0});
                /*���� �Ѿ����ŵ� ��4��    �ҵ���� ��2��   �� 2 ��  inow
                 ��һ�β��ţ�Ӧ�ò��ŵ�3��*/
                // animate(imgs[iNow],{left: 0});
                setSquare();
            }
        }
    }
    //  һ�����Կ��� ����span �� ����   ��ǰ
    function setSquare() {
        //  ������е�span current   ���� ������Ҫ����һ��
        for(var i=1;i<spans.length-1;i++){   //  8��span   ����Ҫ 1-6  ��Ҫ 7  ������
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";  // ��ס + 1
    }
    // ��ʱ����ʼ  ��ʵ�� ��ʱ������  �Ҳఴť
    var timer = null;
    timer = setInterval(autoplay,2000);  // ������ʱ��
    function autoplay() {
        //  �����ǵ��ʱ�� ��ǰ������ͼƬ ���������ߵ����  ��һ�� һ���ȿ����ߵ��Ҳ� ��310����λ�ã�Ȼ���������ߵ���̨��
        // alert("��������Ҳఴť");
        //iNow == 0
        animate(imgs[iNow],{left: -scrollWidth});
        // ��ǰ���Ǹ�ͼƬ �������ߵ� -scrollWidth λ��
        // ���1   �� ++   ++iNow  ���Լ�  �� ����
        ++iNow > imgs.length -1 ?  iNow = 0 : iNow;
        imgs[iNow].style.left = scrollWidth + "px";  // ����ִ��  �����ߵ��Ҳ�
        animate(imgs[iNow],{left: 0}); // ��һ���ߵ� 0 ��λ��  �����߹���
        setSquare();  // ����square
    }
    //��꾭�������ʱ��
    js_slider.onmouseover = function() {
        clearInterval(timer);
    }
    js_slider.onmouseout = function() {
        clearInterval(timer);  // Ҫִ�ж�ʱ�� �������ʱ��
        timer = setInterval(autoplay,2000);  // ������ʱ��
    }
}

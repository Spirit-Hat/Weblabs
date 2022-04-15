
$('document').ready(function (){
    let position = 0;
    const next = $('.next')
    const prev = $('.prev')
    let item = $('.TeacherCard')

    for (var i=0; i<item.length;i++){
        item[i].style.gridColumnStart = `${i+1}` ;
    }

    next.click(function(){
        for (var i=0; i<item.length;i++){
            let count  = Number(item[i].style.gridColumnStart) + 1
            console.log(count)
            if(count === 8){
                item[i].style.gridColumnStart = `${1}` ;
            }
            else {
                item[i].style.gridColumnStart = `${count}` ;
            }
        }


        item.css({
            transform: `translateX(-${position}px)`
        })
    });
    prev.click(function(){
        for (var i=0; i<item.length;i++){
            let count  = Number(item[i].style.gridColumnStart) - 1
            console.log(count)
            if(count === 0){
                item[i].style.gridColumnStart = `${7}` ;
            }
            else {
                item[i].style.gridColumnStart = `${count}` ;
            }
        }


        item.css({
            transform: `translateX(-${position}px)`
        })
    });
});


// !function IndexRender(){}()
class IndexRender{
    constructor(){
        this.tvItemsList=$('tvItemsList');
    }
    init(){
        // console.log('what?');
        $.ajax({
            url:"http://xlxlyqj.xlismine.top:8888/tcl/category/2",
            dataType:"json"       
        }).done(()=>{
            let strhtml="<ul>";
            $.each(data,function(index,value){
                strhtml+=`
                <li>
                <a href="details.html?sid=${value.id}">
                        <img src="${value.pic_url}">
                        <h3>${value.pname}</h3>
                        <p>${value.desc}</p>
                        <span>${value.price}</span>
                </a>
                </li>
                `
            })
            strhtml+='</ul>'
        })
    }

}
export{
    IndexRender
}
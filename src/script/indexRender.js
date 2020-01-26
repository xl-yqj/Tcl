
// http://xlxlyqj.xlismine.top:8888/tcl/category/2
class IndexRender {
    constructor(index) {
        this.tvItemsList = $('.tvItemsList');
    }
    init() {

        $.ajax({
            url: "http://xlxlyqj.xlismine.top:8888/tcl/category/2",
            dataType: "json"
        }).done((data) => {

            let $strhtml = "<ul>";
            $.each(data, function (index, value) {              
                $strhtml += `
                <li>
                    <a href="details.html?sid=${value.id}">
                        <img src="${value.pic_url}">
                        <h3>${value.pname}</h3>
                     
                        <span>${value.price}</span>
                    </a>
                </li>
                `;
            });
            $strhtml += '</ul>';
            this.tvItemsList.html($strhtml);
           
        });
    }

}
export {
    IndexRender
}

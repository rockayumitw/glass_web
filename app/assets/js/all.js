console.log('Hello!');

$(document).ready(() => {
  // 產品 panel
  $('.product-menu li').click(function(){
    let id = $(this).attr('data-id')
    if(id == 3){
      return false
    }else{
      $('.product-menu li').removeClass('active')
      $(this).addClass('active')
      productsPage(id)
    }
  })

  // 據點
  $('.btn-card-info').click(function(){
    $('.section-location').removeClass('active')
    $('.section-location.__location-detail').addClass('active')
  })

  // 部落格最新消息清單
  $('.btn-more, .item-news, .btn-more-small').click(function(){
    console.log('click')
    $('.section-news').removeClass('active')
    $('.section-news.__news-detail').addClass('active')
  })

});


// 產品 panel
function productsPage(page){
  console.log(page)
  $('.section-products').removeClass('active')
  $('.section-products').eq(page-1).addClass('active')
}


angular
  .module('finalProject')
  .controller('NewsCtrl', NewsCtrl);

NewsCtrl.$inject = ['newsService'];
function NewsCtrl(newsService) {
  const vm = this;
  newsService.getNews()
  .then((data) => vm.all = data );

}

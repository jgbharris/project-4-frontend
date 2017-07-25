angular
.module('finalProject')
.controller('PortfoliosIndexCtrl', PortfoliosIndexCtrl)
.controller('PortfoliosNewCtrl', PortfoliosNewCtrl)
.controller('PortfoliosShowCtrl', PortfoliosShowCtrl)
.controller('PortfoliosEditCtrl', PortfoliosEditCtrl);

PortfoliosIndexCtrl.$inject = ['Portfolio'];
function PortfoliosIndexCtrl(Portfolio) {
  const vm = this;
  vm.all = Portfolio.query();
}

PortfoliosNewCtrl.$inject = ['Portfolio', 'Stock', 'User', '$state', '$auth'];
function PortfoliosNewCtrl(Portfolio, Stock, User, $state, $auth) {
  const vm = this;
  vm.portfolio = {};
  vm.portfolio.stocks = [];
  vm.stocks = Stock.query();
  vm.currentUserId = $auth.getPayload().id;

  function portfoliosCreate() {
    Portfolio
    .save(vm.portfolio)
    .$promise
    .then(() => $state.go('usersShow', { id: vm.currentUserId }));
  }

  vm.create = portfoliosCreate;

  function addStock(stock) {
    vm.portfolio.stocks.push(stock); //pushes category to array
  }
  vm.addStock = addStock;

  function deleteStockFromView(stock) {
    console.log(stock);
    const index = vm.portfolio.stocks.indexOf(stock);
    vm.portfolio.stocks.splice(index, 1);
  }
  vm.deleteStockFromView = deleteStockFromView;

}


PortfoliosShowCtrl.$inject = ['Portfolio', '$stateParams', '$state', 'Comment', '$auth', 'User'];
function PortfoliosShowCtrl(Portfolio, $stateParams, $state, Comment, $auth, User) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.portfolio = Portfolio.get($stateParams);

  function portfoliosDelete() {
    vm.portfolio
    .$remove()
    .then(() => $state.go('usersShow'));
  }

  vm.delete = portfoliosDelete;

  function addComment() {
    console.log('clicked');
    vm.comment.portfolio_id = vm.portfolio.id;

    Comment
      .save(vm.comment)
      .$promise
      .then((comment) => {
        vm.portfolio.comments = [];
        vm.portfolio.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.portfolio.comments.indexOf(comment);
        vm.portfolio.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;
}

PortfoliosEditCtrl.$inject = ['Portfolio', '$stateParams', '$state', 'Stock'];
function PortfoliosEditCtrl(Portfolio, $stateParams, $state, Stock) {
  const vm = this;

  vm.portfolio = Portfolio.get($stateParams);

  function portfoliosUpdate() {
    if (vm.portfolioForm.$valid) {
      vm.portfolio
      .$update()
      .then(() => $state.go('portfoliosShow', $stateParams));
    }
  }

  vm.update = portfoliosUpdate;

  function addStock(stock) {
    vm.portfolio.stocks.push(stock); //pushes category to array
    console.log(vm.portfolio.stocks);
  }


  vm.addStock = addStock;

  function deleteStock(stock) {
    Stock
    .delete({ id: stock.id })
    .$promise
    .then(() => {
      const index = vm.portfolio.stocks.indexOf(stock);
      vm.portfolio.stocks.splice(index, 1);
    });
  } //category needs to be passed in

  vm.deleteStock = deleteStock; //attached to controller


}

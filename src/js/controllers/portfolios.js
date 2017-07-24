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
    // .save({ campaignId: vm.campaign.id }, vm.newCategory)
    // .$promise
    // .then((category) => {
    //   console.log(category);
    // });
  }
  vm.addStock = addStock;

  function deleteStockFromView(stock) {
    console.log(stock);
    const index = vm.portfolio.stocks.indexOf(stock);
    vm.portfolio.stocks.splice(index, 1);
  }
  vm.deleteStockFromView = deleteStockFromView;

}


PortfoliosShowCtrl.$inject = ['Portfolio', '$stateParams', '$state'];
function PortfoliosShowCtrl(Portfolio, $stateParams, $state) {
  const vm = this;

  vm.portfolio = Portfolio.get($stateParams);

  function portfoliosDelete() {
    vm.campaign
    .$remove()
    .then(() => $state.go('usersShow'));
  }

  vm.delete = portfoliosDelete;
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

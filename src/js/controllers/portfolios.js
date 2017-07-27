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

PortfoliosNewCtrl.$inject = ['Portfolio', 'Stock', 'User', '$state', '$auth', 'info', 'price', 'companies'];
function PortfoliosNewCtrl(Portfolio, Stock, User, $state, $auth, info, price, companies) {
  const vm = this;
  vm.portfolio = {};
  vm.portfolio.stocks = [];


  // vm.stocks = Stock.query();
  vm.currentUserId = $auth.getPayload().id;

  function portfoliosCreate() {
    Portfolio
    .save(vm.portfolio)
    .$promise
    .then((portfolio) => vm.portfolio = portfolio);
  }

  vm.create = portfoliosCreate;


  function addStock() {
    // create the new stock object to send to the database
    vm.stock = {
      ticker: vm.tickerInfo.ticker,
      name: vm.tickerInfo.name,
      sector: vm.tickerInfo.sector,
      portfolio_id: vm.portfolio.id,
      shares: vm.stock.shares
    };


    console.log(vm.stock);
    Stock
    .save(vm.stock)
    .$promise
    .then((stock) => {
      // stock here is either a new stock, or the one that was already in the db
      if (!vm.portfolio.stocks.includes(stock)) {
        vm.portfolio.stocks.push(stock);
      }
    });
    //pushes category to array
  }
  vm.addStock = addStock;

  function searchTicker() {

    console.log(vm.ticker);

    info.getInfo(vm.ticker)
    .then((info) => {
      vm.tickerInfo = info;
      console.log(info);
    });

    price.getPrice(vm.ticker)
    .then((price) => {
      vm.priceInfo = price;
      console.log(price);
    });
  }

  vm.searchTicker = searchTicker;


  function getComps() {
    companies.getCompanies(vm.q)
    .then((data) => {
      vm.companyInfo = data;
      console.log(data);
    });
  }

  vm.getComps = getComps;

}


PortfoliosShowCtrl.$inject = ['Portfolio', '$stateParams', '$state', 'Comment', '$auth', 'User', 'price', 'info'];
function PortfoliosShowCtrl(Portfolio, $stateParams, $state, Comment, $auth, User, price, info) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
  vm.chartData =[];
  vm.chartNames=[];
  Portfolio.get($stateParams)
  .$promise
  .then((portfolio) => {
    vm.portfolio = portfolio;
    vm.portfolio.stocks = vm.portfolio.stocks.map((stock) => {
      price.getPrice(stock.ticker)
      .then((response) => {
        console.log(response);
        stock.open = response.data[0].adj_open;
        stock.close = response.data[0].adj_close;
        stock.volume = response.data[0].adj_volume;
        stock.date = response.data[0].date;
        vm.chartData.push(parseFloat(stock.shares) * parseFloat(stock.open));
        vm.chartNames.push(stock.name);
        // console.log(stock);
      });
      return stock;
    });
  });


  function portfoliosDelete() {
    console.log('runnning');
    vm.portfolio
    .$remove()
    .then(() => $state.go('usersShow', { id: vm.currentUser.id }));
  }

  vm.delete = portfoliosDelete;



  function addComment() {
    console.log('clicked');
    vm.comment.portfolio_id = vm.portfolio.id;
    console.log('About to save:', vm.comment);


    Comment
    .save(vm.comment)
    .$promise
    .then((comment) => {
      // vm.portfolio.comments = [];
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



  function searchTicker() {

    console.log(vm.ticker);

    info.getInfo(vm.ticker)
    .then((info) => {
      vm.tickerInfo = info;
      console.log(info);
    });

    price.getPrice(vm.ticker)
    .then((price) => {
      vm.priceInfo = price;
      console.log(price);
    });
  }

  vm.searchTicker = searchTicker;


}

PortfoliosEditCtrl.$inject = ['Portfolio', '$stateParams', '$state', 'Stock', 'info', 'price', '$auth', 'companies'];
function PortfoliosEditCtrl(Portfolio, $stateParams, $state, Stock, info, price, $auth, companies) {
  const vm = this;

  vm.currentUserId = $auth.getPayload().id;

  vm.portfolio = Portfolio.get($stateParams);

  function portfoliosUpdate() {
    if (vm.portfolioForm.$valid) {
      vm.portfolio
      .$update()
      .then(() => $state.go('portfoliosShow', $stateParams));
    }
  }

  vm.update = portfoliosUpdate;

  Portfolio.get($stateParams)
  .$promise
  .then((portfolio) => {
    vm.portfolio = portfolio;
    vm.portfolio.stocks = vm.portfolio.stocks.map((stock) => {
      price.getPrice(stock.ticker)
      .then((response) => {
        console.log(response);
        stock.open = response.data[0].adj_open;
        stock.close = response.data[0].adj_close;
        stock.volume = response.data[0].adj_volume;
        stock.date = response.data[0].date;
        console.log(stock);
      });
      return stock;

    });
  });

  function addStock() {
    // create the new stock object to send to the database
    vm.stock = {
      ticker: vm.tickerInfo.ticker,
      name: vm.tickerInfo.name,
      sector: vm.tickerInfo.sector,
      portfolio_id: vm.portfolio.id,
      shares: vm.stock.shares
    };


    console.log(vm.stock);
    Stock
    .save(vm.stock)
    .$promise
    .then((stock) => {
      // stock here is either a new stock, or the one that was already in the db
      if (!vm.portfolio.stocks.includes(stock)) {
        vm.portfolio.stocks.push(stock);
      }
    });
    //pushes category to array
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

  function searchTicker() {

    console.log(vm.ticker);

    info.getInfo(vm.ticker)
    .then((info) => {
      vm.tickerInfo = info;
      console.log(info);
    });

    price.getPrice(vm.ticker)
    .then((price) => {
      vm.priceInfo = price;
      console.log(price);
    });
  }

  vm.searchTicker = searchTicker;


  function getComps() {
    companies.getCompanies(vm.q)
    .then((data) => {
      vm.companyInfo = data;
      console.log(data);
    });
  }

  vm.getComps = getComps;


  function portfoliosDelete() {
    vm.portfolio
    .$remove()
    .then(() => $state.go('usersShow', { id: vm.currentUserId }));
  }

  vm.delete = portfoliosDelete;

}

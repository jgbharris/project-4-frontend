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

PortfoliosNewCtrl.$inject = ['Portfolio', 'Stock', 'User', '$state', '$auth', 'info', 'price'];
function PortfoliosNewCtrl(Portfolio, Stock, User, $state, $auth, info, price) {
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

  function deleteStockFromView(stock) {
    console.log(stock);
    const index = vm.portfolio.stocks.indexOf(stock);
    vm.portfolio.stocks.splice(index, 1);
  }
  vm.deleteStockFromView = deleteStockFromView;

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


PortfoliosShowCtrl.$inject = ['Portfolio', '$stateParams', '$state', 'Comment', '$auth', 'User', 'price'];
function PortfoliosShowCtrl(Portfolio, $stateParams, $state, Comment, $auth, User, price) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  Portfolio.get($stateParams)
  .$promise
  .then((portfolio) => {
    vm.portfolio = portfolio;
    vm.portfolio.stocks = vm.portfolio.stocks.map((stock) => {
      price.getPrice(stock.ticker)
      .then((response) => {
        console.log(response);
        stock.open = response.data[0].adj_open;
        console.log(stock);
      });
      return stock;

    });
  });

  // vm.portfolio = {'id': 7,'name': 'Test 5','stocks': [{'id': 2,'ticker': 'AAPL','name': 'Apple Inc','sector': 'Consumer Goods','created_at': '2017-07-26T08:46:34.198Z','updated_at': '2017-07-26T08:46:34.198Z','shares': 1000,'portfolio_id': 7,'open': 151.8},{'id': 3,'ticker': 'TSLA','name': 'Tesla Inc','sector': 'Consumer Goods','created_at': '2017-07-26T08:46:46.359Z','updated_at': '2017-07-26T08:46:46.359Z','shares': 1000,'portfolio_id': 7,'open': 345}],'comments': [],'stock_ids': [2,3],'user': {'id': 1,'username': 'jimjim','firstname': null,'lastname': null,'created_at': '2017-07-26T08:30:49.615Z','updated_at': '2017-07-26T08:30:49.615Z','email': 'jim@jimjim.com','password_digest': '$2a$10$U/PtM0q52f5jUzE8vtEXlOm7t/uZ94per1W6.z4EKi76BiC8ETmm2','facebook_id': null}};

  function portfoliosDelete() {
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

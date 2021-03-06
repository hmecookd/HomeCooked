'use strict';

var expect = chai.expect;

describe('Controller: SignupCtrl', function() {

  var $q, SignupCtrl, LoginServiceMock, scope;

  beforeEach(module('templates'));

  // load the controller's module
  beforeEach(module('HomeCooked', function($provide) {
    LoginServiceMock = {
      login: function() {
        return $q.when();
      },
      getUser: function() {
        return {};
      },
      setIsChef: function () {
      }
    };
    $provide.value('LoginService', LoginServiceMock);
  }));


  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $injector) {
    $q = $injector.get('$q');
    scope = $rootScope.$new();
    scope.closeModal = function() {};
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
    });
  }));

  it('should call login service', function() {
    var spy = sinon.spy(LoginServiceMock, 'login');
    SignupCtrl.signIn('facebook', 'user', 'pass');
    expect(spy).to.have.been.calledWith('facebook', 'user', 'pass');
    LoginServiceMock.login.restore();
  });

  it('should call close modal on success', function() {
    var spy = sinon.stub(scope, 'closeModal');
    SignupCtrl.signIn('facebook', 'user', 'pass');
    scope.$apply();
    expect(spy).to.have.been.called;
  });

});

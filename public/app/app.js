var anguLara = angular.module('anguLara', ['ngRoute'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
})
    .constant('API_URL', 'http://localhost:8000/api/v1/');
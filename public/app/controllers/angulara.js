anguLara.controller('angularaController', function($scope, $http, API_URL) {
    //retrieve employees listing from API
    $http.get(API_URL + "employees")
        .success(function(response) {
            $scope.employees = response;
        });

    //show modal form
    $scope.toggle = function(modalstate, id) {
        $scope.modalstate = modalstate;

        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add New Employee";
                break;
            case 'edit':
                $scope.form_title = "Employee Detail";
                $scope.id = id;
                $http.get(API_URL + 'employees/' + id)
                    .success(function(response) {
                        console.log(response);
                        $scope.employee = response;
                    });
                break;
            default:
                break;
        }
        console.log(id);
        $('#myModal').modal('show');
    }

    //save new record / update existing record
    $scope.save = function(modalstate, id) {
        var url = API_URL + "employees";

        //append employee id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
        }

        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.employee),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            location.reload();
        }).error(function(response) {
            console.log(response);
            alert('This is embarassing. An error has occured. Please check the log for details');
        });
    }

    //delete record
    $scope.confirmDelete = function(id) {
        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: API_URL + 'employees/' + id
            }).
                success(function(data) {
                    console.log(data);
                    location.reload();
                }).
                error(function(data) {
                    console.log(data);
                    alert('Unable to delete');
                });
        } else {
            return false;
        }
    }
});


anguLara.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl : 'app/views/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'app/views/about.html',
            controller  : 'aboutController'
        })

        .when('/tasks', {
            templateUrl : 'app/views/tasks.html',
            controller  : 'taskController'
        })

        .when('/tasks/:title*', {
            templateUrl : 'app/views/task.html',
            controller  : 'taskController'
        })



        // route for the contact page
        .when('/contact', {
            templateUrl : 'app/views/contact.html',
            controller  : 'contactController'
        })
});

anguLara.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

anguLara.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

anguLara.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

anguLara.controller('taskController', function($scope, $routeParams, $http, API_URL) {
    var param1 = $routeParams.title;
    console.log(param1);
    $http.get(API_URL + "tasks")
        .success(function(response) {
            $scope.tasks = response;
        });
});

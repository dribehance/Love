// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("signupController", function($scope,$rootScope,$location,$timeout, userServices, loveServices, errorServices, toastServices, localStorageService, config) {
        $scope.step = 1;
        $scope.input = {};
        $scope.show_step = function(step) {
            $scope.step = step;
        }
        $scope.modal = {
            status: 0
        };
        $scope.open_modal = function() {
            $scope.modal.status = 1;
        }
        $scope.cancel_modal = function() {
            $scope.modal.status = 0;
        }
        //获取验证码
        $scope.get_smscode = function() {
            toastServices.show();
            userServices.get_smscode({
                telephone: $scope.input.telephone
            }).then(function(data) {
                toastServices.hide();
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    errorServices.autoHide(data.message);
                } else {
                    errorServices.autoHide(data.message)
                }
            })
        };
        // upload success;
        $scope.$on("upload_success", function(event, args) {
            $scope.input.filename = args.message;
        });
        // gender
        $scope.input.gender = 1;
        $scope.select_gender = function(gender) {
                $scope.input.gender = gender;
            }
            // 获取身份列表
        loveServices.query_province().then(function(data) {
            $scope.provinces = data.province;
            $scope.input.province = $scope.provinces[0];
        });
        $scope.$watch('input.province', function(n, o) {
            if (n === undefined) {
                return;
            }
            $scope.query_city(n);
        })
        $scope.query_city = function(province) {
            loveServices.query_city().then(function(data) {
                $scope.cities = data[province];
                $scope.input.city = $scope.cities[0];
            });
        };
        // 第三步骤
        // 身高
        var height = 145,
            heights = [];
        for (var i = 0; i < 60; i++) {
            height++;
            heights.push(height + "cm")
        }
        $scope.heights = heights;
        $scope.input.height = $scope.heights[0];
        // 学历
        $scope.input.degree = "初中以上";
        $scope.input.marry = "未婚";
        $scope.input.income = "5000元以下";
        $scope.ajaxForm = function() {
            toastServices.show();
            userServices.rsa_key().then(function(data) {
                var crypt = new JSEncrypt(),
                    private_key = data;
                crypt.setPrivateKey(private_key);
                var crypted_str = crypt.encrypt($scope.input.password);
                $scope.input.password = crypted_str;
            }).then(function(data) {
                userServices.signup({
                    fileName: $scope.input.filename,
                    telephone: $scope.input.telephone,
                    password: $scope.input.password,
                    tel_code: $scope.input.sms_code,
                    sex: $scope.input.gender,
                    nickname: $scope.input.nickname,
                    province: $scope.input.province,
                    city: $scope.input.city,
                    height: $scope.input.height,
                    edu: $scope.input.degree,
                    marry: $scope.input.marry,
                    income: $scope.input.income,
                    recommend_code: $scope.input.referee,
                }).then(function(data) {
                    toastServices.hide();
                    if (data.code == config.request.SUCCESS &&  data.status == config.response.SUCCESS) {
                        errorServices.autoHide(data.message);
                        $timeout(function(){
                            $location.path('signin').replace()
                        },2000)
                    } else {
                        errorServices.autoHide(data.message)
                    }
                })
            })
        }
    })
    // by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("uploadController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
    var filename, extension;
    $scope.$on("flow::filesSubmitted", function(event, flow) {
        flow.files[0].name.replace(/.png|.jpg|.jpeg|.gif/g, function(ext) {
            extension = ext;
            return ext;
        })
        filename = new Date().getTime() + extension;
        flow.opts.target = config.url + "/app/UserCenter/updatePic";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "image_01";
        flow.opts.query = {
            "invoke": "h5",
            "filename": filename
        };
        toastServices.show();
        flow.upload();
    });
    $scope.$on('flow::fileAdded', function(file, message, chunk) {
        // $scope.cover.url = "";
    });
    $scope.$on('flow::fileSuccess', function(file, message, chunk) {
        $scope.$flow.files = [];
        $scope.$emit("upload_success", {
            message: filename
        });
        toastServices.hide();
    });

})
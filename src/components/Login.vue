<template>

    <div class="container">
        <div class="login-container">

            <!--通过ref给元素（或子组件）注册引用信息，存储在$refs-->
            <!--vm.$refs.loginForm will be this element-->
            <!--:model数据绑定-->
            <!--:rules传入验证规则-->
            <!--autocomplete自动补全-->
            <!--label-position-->
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

                <div class="login-title">
                    <h3 class="title">Login Form</h3>
                </div>

                <!--prop传入要检验的属性-->
                <el-form-item prop="username" class="el-form-item">
                <span class="svg-container">
                    <!--<i class="el-icon-user"/>-->
                    <svg t="1613460974953" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3707" width="16" height="16"><path d="M512 288m-224 0a224 224 0 1 0 448 0 224 224 0 1 0-448 0Z" p-id="3708" fill="#e6e6e6"></path><path d="M704 576H320c-105.6 0-192 86.4-192 192s86.4 192 192 192h384c105.6 0 192-86.39 192-192s-86.4-192-192-192z" p-id="3709" fill="#e6e6e6"></path></svg>
                </span>
                    <!--v-model实现数据双向绑定，即v-bind="inputValue"&&v-on:input="inputValue=$event.target.value"-->
                    <el-input
                            ref="username"
                            v-model="loginForm.username"
                            placeholder="Username"
                            name="username"
                            type="text"
                            tabindex="1"
                            autocomplete="on"
                    />
                </el-form-item>

                <el-tooltip v-model="capsTooltip" content="Caps lock is on" placement="right" manual>
                    <el-form-item prop="password">
                    <span class="svg-container">
                        <!--<i class="el-icon-lock"/> -->
                        <svg t="1613461080237" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4717" width="16" height="16"><path d="M780.8 354.58H665.6v-42.89c0-72.31-19.85-193.3-153.6-193.3-138.87 0-153.6 135.05-153.6 193.3v42.89H243.2v-42.89C243.2 122.25 348.79 0 512 0s268.8 122.25 268.8 311.69v42.89z m-192 314.84c0-43.52-34.58-78.65-76.8-78.65s-76.8 35.13-76.8 78.65c0 29.46 15.4 54.47 38.44 67.82v89.64c0 21.74 17.25 39.7 38.4 39.7s38.4-17.96 38.4-39.7v-89.64c23-13.35 38.36-38.36 38.36-67.82zM896 512v393.61c0 65.26-51.87 118.39-115.2 118.39H243.2c-63.291 0-115.2-53.13-115.2-118.39V512c0-65.22 51.87-118.39 115.2-118.39h537.6c63.33 0 115.2 53.17 115.2 118.39z" p-id="4718" fill="#e6e6e6"></path></svg>
                    </span>
                        <!--属性前有冒号表明接一个变量，没有冒号则接的是字符串-->
                        <el-input
                                :key="passwordType"
                                ref="password"
                                v-model="loginForm.password"
                                :type="passwordType"
                                placeholder="Password"
                                name="password"
                                tabindex="2"
                                autocomplete="on"
                                @keyup.native="checkCapslock"
                                @blur="capsTooltip = false"
                                @keyup.enter.native="handleLogin"
                        />
                        <span class="show-pwd" @click="showPwd">
                        <!--<svg t="1613478193629" class="icon" viewBox="0 0 1490 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2505" width="16" height="16"><path d="M737.640565 43.727581C314.544984 43.727581 50.155535 512 50.155535 512s261.859496 468.272419 687.478783 468.272419c398.102145 0 700.25973-468.272419 700.25973-468.272419S1138.222689 43.727581 737.640565 43.727581L737.640565 43.727581zM741.407384 699.535102c-103.053415 0-186.516874-83.725824-186.516874-187.010371s83.500939-187.047851 186.516874-187.047851c103.015934 0 186.554354 83.757058 186.554354 187.047851S844.423318 699.535102 741.407384 699.535102L741.407384 699.535102z" p-id="2506" fill="#e6e6e6"></path></svg>
                   -->
                    </span>
                    </el-form-item>
                </el-tooltip>

                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
                    Login
                </el-button>

            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",

        data(){
            /*账号验证*/
            /*const validateUsername = (rule,value,callback)=>{
                if (!validateUsername(value)){
                    callback(new Error('pls enter the correct name!'));
                }else{
                    callback();
                }
            };*/
            /*密码验证*/
            /*const validatePassword = (rule,value,callback)=>{
                if (value.length<6){
                    callback(new Error('psw cant less than 6 digits!'));
                }else{
                    callback();
                }
            };*/
            return {
                loginForm:{
                    username:'',
                    password:''
                },
                loginRules:{
                    username:[
                        { require:true,message:'请输入用户名',trigger:'blur'},
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },

                    ],
                    password:[
                        { require:true,message:'请输入密码',trigger:'blur'},
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                },
                passwordType: 'password',
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            }
        },
        /*watch(){

        },*/
        created() {
            console.log(document.body.clientHeight)
        },

        mounted() {
            console.log(this.$route);
            console.log(this.$router);
            if (this.loginForm.username === '') {
                /*获取焦点*/
                this.$refs.username.focus()
            } else if (this.loginForm.password === '') {
                this.$refs.password.focus()
            }
        },
        destroyed() {
        },
        methods: {
            checkCapslock() {

            },
            showPwd() {
                console.log("show password!");
            },
            handleLogin() {
                this.$refs['loginForm'].validate(valid=>{
                    if (valid){
                        console.log("login in!");
                        this.$router.push({
                            path:'/Home'
                        });
                    }else {
                        console.log("login failed!")
                    }
                });
            },
            getOtherQuery() {

            }
            // afterQRScan() {
            //   if (e.key === 'x-admin-oauth-code') {
            //     const code = getQueryObject(e.newValue)
            //     const codeMap = {
            //       wechat: 'code',
            //       tencent: 'code'
            //     }
            //     const type = codeMap[this.auth_type]
            //     const codeName = code[type]
            //     if (codeName) {
            //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
            //         this.$router.push({ path: this.redirect || '/' })
            //       })
            //     } else {
            //       alert('第三方登录失败')
            //     }
            //   }
            // }
        }

    }
</script>


<style>
    .container{

    }
    /*登录框*/
    .login-container {
        position: absolute;
        background: #2d3a4b;
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        top:0;
        left:0;
    }
    /*表单容器*/
    .login-container .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px;
        margin: 0 auto;
        overflow: hidden;
    }
    /*标题*/
    .login-container .login-title {
        color: #fff;
    }
    /*边框*/
    .login-container .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        /*background: rgba(0, 0, 0, 0.1);*/
        border-radius: 5px;
    }
    /*输入框*/
    .login-container .el-input {
        width: 85%;
    }
    .login-container .el-input__inner {
        background-color: #2d3a4b;
        border: none;
        color: #fff;
    }
    /*图标*/
    .login-container .svg-container {
        display: inline-block;
    }
    .login-container .show-pwd {
        display: inline-block;
    }
</style>

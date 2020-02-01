<template>
    <div class="saurkraanti-section">
        <div id="wrapper">
            <div class="section-side">
                <aside id="sidebar-wrapper" class="animated animatedFadeInUp fadeInLeft">
                    <div class="section-side-div">
                        <div class="menu-aside-1">
                            <div class="menu-aside-x-overflow">
                                <div class="user-img">
                                    <div class="user-icon">
                                        <img src="assets/images/75.jpg" alt="">
                                    </div>
                                    <div class="user-text">
                                        <h4>
                                            Rahul K
                                        </h4>
                                        <p>
                                            <span> <i class="user-icon-status"></i> </span>Online
                                        </p>
                                    </div>
                                </div>
                                <div class="side-memnu">
                                    <ul class="sidebar-nav">
                                        <template v-for="item in menus">
                                            <li v-if="!item.items" :key="item.name">
                                                <span @click="RedirectMenu(item.name)" class="d-flex align-items-center">
                                                    <b-icon :icon="item.icon" style="width: 28px; height: 28px;margin: 0px 10px;"></b-icon>
                                                    <span>{{ item.title }}</span> 
                                                </span>
                                            </li>
                                            <li v-else :key="item.name">
                                                <span style="padding: 0;position: relative;" class="d-flex align-items-center nav-link collapsed" href="#submenu1" data-toggle="collapse" data-target="#submenu1">
                                                    <b-icon :icon="item.icon" style="width: 28px; height: 28px;margin: 0px 10px;"></b-icon>
                                                    <span>{{ item.title }}</span>
                                                    <b-icon icon="chevron-down" style="width: 20px; height: 20px;position: absolute;right: 0;"></b-icon>
                                                </span>
                                                <div class="collapse" id="submenu1" aria-expanded="false">
                                                    <ul class="flex-column pl-2 nav">
                                                        <template v-for="subitem in item.items">
                                                            <li :key="subitem.name">
                                                                <span @click="RedirectMenu(subitem.name)" class="d-flex align-items-center">
                                                                    <b-icon :icon="subitem.icon" style="width: 22px; height: 22px;margin: 0px 10px;"></b-icon>
                                                                    <span>{{ subitem.title }}</span> 
                                                                </span>
                                                            </li>
                                                        </template>
                                                    </ul>
                                                </div>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <div id="navbar-wrapper1">
                    <div class="navbar-wrapper-bg">
                        <img src="@/assets/images/download.svg" alt="">
                    </div>
                    <div class="navbar-header1">
                        <a href="#" class="navbar-brand navbrand-bar" id="sidebar-toggle"><i class="fa fa-bars"></i></a>
                    </div>
                    <div class="relative">
                        <nav class="navbar fixed-top navbar-expand-lg navbar-light  navbar-s-k">
                            <button class="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                                <ul class="ul-nav-right-icon d-flex">
                                    <li>
                                        <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="28px" height="28px"
                                             viewBox="0 0 1024 1024" rotate="0">
                                            <path d="M576 800c0 34-28.8 64-64 64s-64.4-30-64.4-64h-32c0 52 43.2 95.8 96.2 95.8s96.2-43.8 96.2-95.8h-32z M747.8 458.4c0-198-98-265.6-189.8-281 0-1.2 0.2-2.2 0.2-3.4 0-25.4-20.6-46-46-46s-46 20.6-46 46c0 1.2 0 2.4 0.2 3.6-91.8 15.6-189.8 83.8-189.8 281.4-0.4 231-45.4 245-116.6 309h704c-70.8-64-116.2-78.2-116.2-309.6zM242.2 736c14.4-16 27.4-34.8 37.8-60 19.6-47.4 28.2-114.6 28.2-217.4 0-82.6 18-146.2 53.6-189 27.2-32.8 67.4-55.4 110.8-61 33.6-4.2 44.4-4.8 79.4 0 41.6 5.8 83.2 28 110.4 60.8 35.4 42.8 53.4 106.4 53.4 189 0 102.8 8.8 169.8 28.4 217.4 10.4 25.2 23.4 44.2 38 60.2h-540z"></path>
                                        </svg>
                                    </li>
                                    <li class="nav-item dropdown p-0">
                                        <a class="nav-link dropdown-toggle1" href="#" id="navbarDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img class="nav-s-k-right" src="assets/images/75.jpg" alt="">
                                        </a>
                                        <div class="dropdown-menu dropdown-s-k" aria-labelledby="navbarDropdown">
                                            <a class="dropdown-item" href="#"><i
                                                    class="far profile-icon fa-user-circle pr-2"></i>My Account</a>
                                            <a class="dropdown-item" href="#"><i
                                                    class="far profile-icon fa-envelope pr-2"></i>My Inbox</a>
                                            <a class="dropdown-item" href="#"><i
                                                    class="fas profile-icon fa-question pr-2"></i>Help</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#"><i
                                                    class="fas profile-icon fa-sign-out-alt pr-2"></i>Log Out</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div class="container-div">
                        <section id="content-wrapper">
                            <div class="row">
                                <div class="col-lg-12">
                                    <router-view></router-view>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import menu from "../util/Menu";
    export default {
        data(){
            return {
                menus : menu
            }
        },
        methods:{
            RedirectMenu(RedirectURL){
                this.$router.push(`/${RedirectURL}`)
            }
        },
        mounted() {
            let sidebarWrapper = document.getElementById('sidebar-wrapper')
            let navbarToggle = document.getElementById('sidebar-toggle');
            let wrapper = document.getElementById('wrapper');
            navbarToggle.addEventListener('click', function (e) {
                e.preventDefault();
                wrapper.classList.toggle('toggled')
                sidebarWrapper.classList.toggle('_before')
            });
        }
    }
</script>

<style scoped>
   
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&display=swap');

body {
    padding-bottom: 30px;
    position: relative;
    min-height: 100%;
}

_before {
    background: #fef7f2;
    content: '';
    width: 250px;
    height: 350px;
    display: block;
    border-bottom-left-radius: 90px;
    position: fixed;
    overflow: hidden;
    transition: all 0.5s ease;
}

.side-memnu {
    margin-top: 40px;
}

li.active a {
    color: #EF6C00 !important;
}

li.active svg {
    fill: #EF6C00 !important;
}

.section-side-div {
    position: absolute;
    top: 0;
}

a {
    transition: background 0.2s, color 0.2s;
}

a:hover,
a:focus {
    text-decoration: none;
}

#wrapper {
    padding-left: 0;
    transition: all 0.5s ease;
    position: relative;

}

#sidebar-wrapper {
    position: fixed;
    left: 250px;
    width: 0;
    height: 100%;
    margin-left: -250px;
    overflow-y: hidden;
    overflow-x: hidden;
    background: #fff;
    transition: all 0.5s ease;
    z-index: 3;
}

aside#sidebar-wrapper:hover {
    overflow-y: auto;
    overflow-x: hidden;
}

#wrapper.toggled #sidebar-wrapper {
    width: 250px;
}

ul.sidebar-nav li.active:before {
    content: '';
    display: block;
    border-right: 5px solid #fdcf7d;
    width: 3px;
    height: 29px;
    position: absolute;
    left: 0;
    font-weight: 800;
}

.sidebar-brand h2 {
    color: rgba(0, 0, 0, 0.87);
    font-size: 16px;
    align-items: center;
    font-weight: 500;
    justify-content: center;
    text-decoration: none;
}

.user-img {
    width: 100%;
    height: auto;
}

.user-icon img {
    width: 80px;
}

.user-text {
    text-align: center;
    margin-top: 10px;
}

i.user-icon-status {
    width: 8px;
    height: 8px;
    display: inline-block;
    margin-right: 4px;
    border-radius: 50%;
    background: #8bc34a;
}

.user-text p {
    font-size: 14px;
}

.user-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 2px 20px -5px #EC407A;
}


/*----------------toggled css----------------*/
.toggled .user-icon {
    width: 40px;
    height: 40px;
}

.toggled .side-memnu {
    margin-top: -19px;
}

.toggled .sidebar-brand {
    display: none;
}

.toggled .user-icon img {
    width: 40px;
}

.toggled .user-text {
    display: none;
}

.toggled .user-img {
    height: 95px;
}

.toggled .section-side-div {
    position: unset;
    top: 0;
}

.toggled aside#sidebar-wrapper:before {
    display: none;
}

.toggled ul.sidebar-nav li {
    padding-left: 8px;
}

.toggled ul.sidebar-nav span {
    opacity: 0;
}

.sidebar-nav {
    /* position: absolute;
    top: 75px; */
    width: 250px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.sidebar-nav > li {
    text-indent: 10px;
    line-height: 42px;
}

.sidebar-nav > li a {
    font-size: 14px;
    font-family: Open Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.87);
}

.fas-drop {
    font-size: 1.3rem !important;
    font-weight: 800 !important;
    position: absolute;
    right: 0;
}

ul.sidebar-nav li {
    margin: 5px 0;
    padding: 0;
    padding-left: 24px;
    /* border-radius: 0 24px 24px 0; */
    padding-right: 24px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.menu-aside-1 {
    padding-top: 4em;
}

ul.sidebar-nav svg {
    width: 34px;
}

.toggled ul.sidebar-nav svg {
    width: 50px;
}

ul.sidebar-nav li:hover {
    background-color: rgba(80, 80, 80, 0.05);
    /* border-radius: 50px; */
}

.sidebar-nav > li > a i.fa {
    /* font-size: 24px; */
    width: 60px;
}

ul.dropdown-ul li {
    list-style-type: none;
    padding-left: 20px;
}

.user-text h4 {
    width: 100%;
    overflow: hidden;
    font-size: 18px;
    white-space: nowrap;
    margin-bottom: 0;
    text-overflow: ellipsis;
    text-align: center;
    font-weight: 800;
}

ul.dropdown-ul li {
    padding: 0;
    line-height: 32px;
    margin-left: 10px;
}

ul.dropdown-ul {
    margin-top: 15px;
    display: none;
}

ul.dropdown-ul1 {
    margin-top: 15px;
    display: none;
}

ul.dropdown-ul2 {
    margin-top: 15px;
    display: none;
}

ul.dropdown-ul.dropdown-ul-n a {
    padding-left: 19px;
    color: rgba(0, 0, 0, 0.87);
}

ul.dropdown-ul li a {
    font-size: 0.875rem;
    font-family: Open Sans, sans-serif;
    font-weight: 500;
    line-height: 1.43;
}

ul.dropdown-ul1 li a {
    font-size: 0.875rem;
    font-family: Open Sans, sans-serif;
    font-weight: 500;
    line-height: 1.43;
    color: rgba(0, 0, 0, 0.87);
}

ul.dropdown-ul2 li a {
    font-size: 0.875rem;
    font-family: Open Sans, sans-serif;
    font-weight: 500;
    line-height: 1.43;
    color: rgba(0, 0, 0, 0.87);
}

ul.dropdown-ul1 li {
    padding: 0;
    line-height: 32px;
    margin-left: 10px;
}

ul.dropdown-ul2 li {
    padding: 0;
    line-height: 32px;
    margin-left: 10px;
}

#navbar-wrapper {
    width: 100%;
    position: absolute;
}

#wrapper.toggled #navbar-wrapper {
    position: absolute;
    margin-right: -250px;
}

.navbar-s-k {
    border-width: 0 0 0 0;
    font-size: 24px;
    margin-bottom: 0;
    border-radius: 0;
    /* box-shadow: 0px 1px 8px 0px rgba(80,80,80, 0.2), 0px 3px 4px 0px rgba(80,80,80, 0.14), 0px 3px 3px -2px rgba(80,80,80, 0.12); */
    background-attachment: fixed;
    position: fixed;
    width: 100%;
    z-index: 2 !important;
}

.navbrand-bar {
    background: #fff;
    width: 40px;
    height: 40px;
    color: #EF6C00;
    background: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    box-shadow: 0 2px 40px -5px #EF6C00;
    top: 14px;
    margin-left: -22px;
    z-index: 3;
}

.navbrand-bar:hover {
    color: #EF6C00;
}

#navbar-wrapper .navbar a:hover {
    color: #F8BE12;
}

#content-wrapper {
    width: 100%;
    position: absolute;
    padding: 15px;
    top: 100px;
}

#wrapper.toggled #content-wrapper {
    position: absolute;
    margin-right: -250px;
}

@media (min-width: 992px) {
    #wrapper {
        padding-left: 250px;
    }

    #wrapper.toggled {
        padding-left: 60px;
    }

    #sidebar-wrapper {
        width: 250px;
    }

    #wrapper.toggled #sidebar-wrapper {
        width: 64px;
    }

    #wrapper.toggled #navbar-wrapper {
        position: absolute;
        margin-right: -190px;
    }

    #wrapper.toggled #content-wrapper {
        position: absolute;
        margin-right: -190px;
    }

    #navbar-wrapper {
        position: relative;
    }

    #wrapper.toggled {
        padding-left: 60px;
    }

    #content-wrapper {
        position: relative;
        top: 5em;
        margin-bottom: 5em;

    }

    #wrapper.toggled #navbar-wrapper,
    #wrapper.toggled #content-wrapper {
        position: relative;
        margin-right: 60px;
    }
}

@media (min-width: 768px) and (max-width: 991px) {
    #wrapper {
        padding-left: 60px;
    }

    #sidebar-wrapper {
        width: 60px;
    }

    #wrapper.toggled #navbar-wrapper {
        position: absolute;
        margin-right: -250px;
    }

    #wrapper.toggled #content-wrapper {
        position: absolute;
        margin-right: -250px;
    }

    #navbar-wrapper {
        position: relative;
    }

    #wrapper.toggled {
        padding-left: 250px;
    }

    #content-wrapper {
        position: relative;
        top: 0;
    }

    #wrapper.toggled #navbar-wrapper,
    #wrapper.toggled #content-wrapper {
        position: relative;
        margin-right: 250px;
    }
}

@media (max-width: 767px) {
    #wrapper {
        padding-left: 0;
    }

    #sidebar-wrapper {
        width: 0;
    }

    #wrapper.toggled #sidebar-wrapper {
        width: 250px;
    }

    #wrapper.toggled #navbar-wrapper {
        position: absolute;
        margin-right: -250px;
    }

    #wrapper.toggled #content-wrapper {
        position: absolute;
        margin-right: -250px;
    }

    #navbar-wrapper {
        position: relative;
    }

    #wrapper.toggled {
        padding-left: 250px;
    }

    #content-wrapper {
        position: relative;
        top: 0;
    }

    #wrapper.toggled #navbar-wrapper,
    #wrapper.toggled #content-wrapper {
        position: relative;
        margin-right: 250px;
    }
}

.result_hover {
    width: 250px !important;

}

.toggled a#sidebar-toggle {
    left: 30px;
}

aside#sidebar-wrapper .sidebar-nav span {
    opacity: 1 !important;
}

.result_hover .user-text {
    display: block;
}

.result_hover #sidebar-wrapper:before {
    display: block;
}

ul.ul-nav-right-icon li {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
}

ul.ul-nav-right-icon {
    margin-bottom: 0;
    padding-left: 0;
}

.jss2611.jss2598 svg {
    fill: #fff;
}

ul.ul-nav-right-icon svg {
    fill: #fff;
}

ul.ul-nav-right-icon img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.dropdown-toggle1::after {
    display: none;
}

.dropdown-menu.dropdown-s-k.show {
    left: -80px;
}

ul.ul-nav-right-icon.d-flex sup {
    height: 20px;
    display: flex;
    padding: 0 6px;

    position: relative;
    left: -6px;
    font-size: 0.75rem;
    min-width: 20px;
    box-sizing: border-box;
    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    font-family: Open Sans, sans-serif;
    font-weight: 600;
    line-height: 1;
    align-content: center;
    border-radius: 10px;
    flex-direction: row;
    justify-content: center;
    color: #fff;
    background-color: #9C27B0;
    top: -8px;
}

.navbar-wrapper-bg {
    height: 400px;
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    /* background-image: linear-gradient(-45deg, #EF6C00 0%, #EF6C00 33%, #9C27B0 100%); */
    /* background-image: linear-gradient(-45deg, #2b163c 0%, #771e10 33%, #9C27B0 100%); */
    background-image: linear-gradient(-45deg, rgba(3, 1, 76, 1) 0%, rgba(3, 1, 76, 1) 33%, rgba(154, 0, 0, 1) 100%);

    /*background-attachment: fixed;*/
}

.navbar-wrapper-bg.bg-2 {
    background-image: linear-gradient(-45deg, rgba(154, 0, 0, 1) 0%, rgba(154, 0, 0, 1) 33%, rgba(3, 1, 76, 1) 100%);
}


/* linear-gradient(to bottom, rgba(3,1,76,1) 0%, rgba(154,0,0,1) 100%); */
.navbar-wrapper-bg img {
    position: absolute;
    bottom: -62px;
}

.toggled .user-img {
    display: flex;
    align-items: center;
}

.toggled .user-icon {
    margin: 0;
    margin-left: 16px;
}

.toggled .user-text {
    padding-left: 15px;
}

.toggled .navbar-s-k {
    width: 100%;
    /* background-image: linear-gradient(-45deg, #EF6C00 0%, #EF6C00 33%, #9C27B0 100%) !important; */
    /* box-shadow: 0px 1px 8px 0px rgba(80,80,80, 0.2), 0px 3px 4px 0px rgba(80,80,80, 0.14), 0px 3px 3px -2px rgba(80,80,80, 0.12); */
    background-attachment: fixed;
}

.container-div {
    padding-left: 15px;
    padding-right: 15px;
}

div#main-slider img {
    width: 100%;
}

div#main-slider .owl-nav {
    position: absolute;
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    top: 35%;
}

/*.h-s {*/
/*    height: 269px !important;*/
/*    position: relative;*/
/*    overflow: hidden;*/
/*}*/

div#main-slider .owl-prev {
    background: unset;
    font-size: 30px;
    color: #808387;
}

div#main-slider .owl-next {
    background: unset;
    font-size: 30px;
    color: #808387;
}

nav.scroll1 {
    background-color: red;
    color: #eef;
}

/* .result_hover .user-img {
  display: flex;
} */
li.nav-item.dropdown.p-0 {
    margin-left: -8px;
}

.scrolled1 {
    /* background-image: linear-gradient(-45deg, #EF6C00 0%, #EF6C00 33%, #9C27B0 100%) !important; */
    background-image: linear-gradient(-45deg, rgba(3, 1, 76, 1) 0%, rgba(3, 1, 76, 1) 33%, rgba(154, 0, 0, 1) 100%);
    box-shadow: 0px 1px 8px 0px rgba(80, 80, 80, 0.2), 0px 3px 4px 0px rgba(80, 80, 80, 0.14), 0px 3px 3px -2px rgba(80, 80, 80, 0.12);
    background-attachment: fixed;
}

/* .slider-sak .carousel-item {
  position: relative;
  overflow: hidden;
} */


@-webkit-keyframes fadeInUp {
    from {
        transform: translate3d(0, 40px, 0)
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}

.animated {
    animation-duration: 4s;
    animation-fill-mode: both;
    -webkit-animation-duration: 4s;
    -webkit-animation-fill-mode: both
}

/* .animatedFadeInUp {
  opacity: 0
} */

.fadeInUp {
    opacity: 0;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
    animation-delay: 0.7s
}

.bounceDown {
    opacity: 0;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
    animation-delay: 0.1s
}

.bounceInLeft {

    animation-name: bounceInLeft;
    -webkit-animation-name: bounceInLeft;
    animation-delay: 0.4s

}


.modal-dialog.rfq-modal {
    max-width: 100%;
    margin: 0;
}

.modal-dialog.rfq-modal {
    width: 100%;
    max-width: 100%;
    margin: 0;
}


.modal-header.rfq-header h1 {
    font-size: 20px;
    color: #FFE;
}


.nav-tabs .nav-item {
    margin-bottom: -1px;
    padding: 10px 20px;
}

ul#myTab a {
    text-transform: capitalize;
    color: #00000073;
    font-weight: 500;
    font-size: 15px;
}


.head-prod-img img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}


.head-prod-icon h6 {
    font-weight: 600;
    padding-left: 10px;
    font-size: 18px;
}

.update-img button {
    background: unset;
    border: unset;
}

.update-img .fas {
    font-size: 28px;
}

.user-like-icon .fa-heart {
    font-size: 22px;
}

.review-like {
    text-align: center;
    float: left;
}


.notebook-user .fa-address-book {
    font-size: 22px;
    display: flex;
    justify-content: flex-end;
}


.btn:focus {
    outline: none !important;
}


.side-menu-prod-img {
    background-image: linear-gradient(-45deg, rgba(3, 1, 76, 1) 0%, rgba(3, 1, 76, 1) 33%, rgba(154, 0, 0, 1) 100%);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.side-menu-icon-img img {
    width: 35px;
}


.side-menu-icon-img h6 {
    color: #361e3b;
    font-size: 17px;
    font-weight: 500;
    width: 100%;
    margin-top: 14px;
    margin-bottom: 0;
}


.main-sec-slider-1 .owl-nav {
    margin-top: 10px;
}


.main-sec-slider-1 {
    /* height: 350px; */
    /* position: relative;
    overflow: hidden; */
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.owl-slider .owl-nav {
    display: block !important;
}

.owl-slider .owl-next {
    right: 0 !important;
    position: absolute;

}

.owl-slider .owl-prev {
    left: 0 !important;
    position: absolute;

}

.fas-s {
    color: gray;
    font-size: 16px;
    margin-top: 10px;
}


/* .main-2-div .carousel-inner {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
} */

.head-prod-img.main-2-img img {
    width: 40px;
    height: 40px;
}

.head-prod-icon.d-flex.align-items-center.main-2-h6 h6 {
    font-size: 14px;
    padding-left: 0;
}

.update-img.main-2-fas .fas {
    font-size: 18px;
}

.user-like-icon.main-2-like .far {
    font-size: 18px;
}


/* .main-2-div .slick-dots {
    bottom: -4px;
} */


.buttons {
}

.operators {
}

.operators div {
    display: inline-block;
    border: 1px solid #bbb;
    border-radius: 1px;
    width: 60px;
    text-align: center;
    padding: 0px;
    margin: 20px 4px 10px 0;
    cursor: pointer;
    background-color: #ddd;
    transition: border-color .2s ease-in-out, background-color .2s, box-shadow .2s;
}

.operators div:hover {
    background-color: #ddd;
    -webkit-box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    border-color: #aaa;
}

.operators div:active {
    font-weight: bold;
}


.numbers div {
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 1px;
    width: 60px;
    text-align: center;
    padding: 0px;
    margin: 10px 4px 10px 0;
    cursor: pointer;
    background-color: #f9f9f9;
    transition: border-color .2s ease-in-out, background-color .2s, box-shadow .2s;
}

.numbers div:hover {
    background-color: #f1f1f1;
    -webkit-box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    border-color: #bbb;
}

.numbers div:active {
    font-weight: bold;
}


@media only screen and (min-width: 1601px) {
    .container-1 {
        max-width: 1568px
    }

}

@media only screen and (min-width: 1441px) and (max-width: 1600px) {
    .container-1 {
        width: 1290px
    }

}

@media only screen and (min-width: 1281px) and (max-width: 1440px) {
    .container-1 {
        width: 1170px
    }
}

@media only screen and (min-width: 992px) and (max-width: 1280px) {
    .container-1 {
        width: 1170px
    }

    ._before {
        display: none;
    }
}

@media only screen and (max-width: 479px) {
    ._before {
        display: none;
    }
}

</style>
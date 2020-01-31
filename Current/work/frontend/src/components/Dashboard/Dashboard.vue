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
                                            {{CurrentUser.name}}
                                        </h4>
                                        <p>
                                            <span> <i class="user-icon-status"></i> </span>Online
                                        </p>
                                    </div>
                                </div>
                                <div class="side-memnu">
                                    <ul class="sidebar-nav">
                                        <li class="">
                                            <a href="index.php" class="d-flex align-items-center">
                                                <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px"
                                                     viewBox="0 0 1024 1024" rotate="0">
                                                    <path d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z"></path>
                                                </svg>
                                                <span>Home</span> </a>
                                        </li>
                                        <li class="sub-menu">
                                            <a href="#" class="d-flex align-items-center">
                                                <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px"
                                                     viewBox="0 0 1024 1024" rotate="0">
                                                    <path d="M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z M278.6 704l68.4-57.6-49.4-32.4z M684.4 596c-13.6 6.4-30.4 28-7.8 57.2 18.2 23.4 36 17.4 53 50.8 9.6-8.2 18.8-43.4 14.6-71.4-4.8-30.6-24.6-53-59.8-36.6z M503.2 379.2c3.2-5.4 1.2-12.6-4.2-15.8l-30.2-17.2c-5.6-3.2-12.6-1.2-15.8 4.2l-111.8 193.6-33.8 58.4 49.8 30 87.8-152.6 58.2-100.6z M461.2 480l-37 64h178.4l-36.2-64z M702 544h66v-64h-102z M362.2 480h-106.2v64h69.2z M649.2 480l-120-211.6c-3.2-5.6-10.4-7.4-15.8-4.2l-30.2 17.2c-5.6 3.2-7.4 10.2-4.2 15.8l140 247.4 1-0.6 48.8-29.6-19.6-34.4z M686.4 544l-9.8-17.4-49.6 30 26 46 49.8-30.2z"></path>
                                                </svg>
                                                <span>RFQ</span> <i class="fa fas-drop fa-angle-down"></i></a>
                                        </li>
                                        <ul class="dropdown-ul dropdown-ul-n">
                                            <li><a href="#"> New RFQ </a></li>
                                            <li><a href="#"> Respond RFQ </a></li>
                                            <li><a href="#"> My RFQ </a></li>
                                            <li><a href="#"> My Bidding </a></li>
                                        </ul>
                                        <li class="">
                                            <a href="#" class="d-flex align-items-center">
                                                <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px"
                                                     viewBox="0 0 1024 1024" rotate="0">
                                                    <path d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z"></path>
                                                </svg>
                                                <span>Tender</span> </a>
                                        </li>
                                        <li class="">
                                            <a href="product-showcase.php" class="d-flex align-items-center">
                                                <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px"
                                                     viewBox="0 0 1024 1024" rotate="0">
                                                    <path d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z"></path>
                                                </svg>
                                                <span>Product Showcase</span> </a>
                                        </li>
                                        <li class="">
                                            <a href="#" class="d-flex align-items-center">
                                                <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px"
                                                     viewBox="0 0 1024 1024" rotate="0">
                                                    <path d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z"></path>
                                                </svg>
                                                <span> My Product</span></a>
                                        </li>
                                        <li class="">
                                            <a href="chat.php" class="d-flex align-items-center">
                                                <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px"
                                                     viewBox="0 0 1024 1024" rotate="0">
                                                    <path d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z"></path>
                                                </svg>
                                                <span>Chat</span> </a>
                                        </li>
                                        <li class="sub-menu1">
                                            <a href="#" class="d-flex align-items-center">
                                                <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px"
                                                     viewBox="0 0 1024 1024" rotate="0">
                                                    <path d="M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z M278.6 704l68.4-57.6-49.4-32.4z M684.4 596c-13.6 6.4-30.4 28-7.8 57.2 18.2 23.4 36 17.4 53 50.8 9.6-8.2 18.8-43.4 14.6-71.4-4.8-30.6-24.6-53-59.8-36.6z M503.2 379.2c3.2-5.4 1.2-12.6-4.2-15.8l-30.2-17.2c-5.6-3.2-12.6-1.2-15.8 4.2l-111.8 193.6-33.8 58.4 49.8 30 87.8-152.6 58.2-100.6z M461.2 480l-37 64h178.4l-36.2-64z M702 544h66v-64h-102z M362.2 480h-106.2v64h69.2z M649.2 480l-120-211.6c-3.2-5.6-10.4-7.4-15.8-4.2l-30.2 17.2c-5.6 3.2-7.4 10.2-4.2 15.8l140 247.4 1-0.6 48.8-29.6-19.6-34.4z M686.4 544l-9.8-17.4-49.6 30 26 46 49.8-30.2z"></path>
                                                </svg>
                                                <span>Lead</span> <i class="fa fas-drop fa-angle-down"></i></a>
                                        </li>
                                        <ul class="dropdown-ul1 dropdown-ul-n">
                                            <li><a href="#"> New RFQ </a></li>
                                            <li><a href="#"> Respond RFQ </a></li>
                                            <li><a href="#"> My RFQ </a></li>
                                            <li><a href="#"> My Bidding </a></li>
                                        </ul>
                                        <li class="sub-menu2">
                                            <a href="#" class="d-flex align-items-center">
                                                <svg class="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px"
                                                     viewBox="0 0 1024 1024" rotate="0">
                                                    <path d="M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z M278.6 704l68.4-57.6-49.4-32.4z M684.4 596c-13.6 6.4-30.4 28-7.8 57.2 18.2 23.4 36 17.4 53 50.8 9.6-8.2 18.8-43.4 14.6-71.4-4.8-30.6-24.6-53-59.8-36.6z M503.2 379.2c3.2-5.4 1.2-12.6-4.2-15.8l-30.2-17.2c-5.6-3.2-12.6-1.2-15.8 4.2l-111.8 193.6-33.8 58.4 49.8 30 87.8-152.6 58.2-100.6z M461.2 480l-37 64h178.4l-36.2-64z M702 544h66v-64h-102z M362.2 480h-106.2v64h69.2z M649.2 480l-120-211.6c-3.2-5.6-10.4-7.4-15.8-4.2l-30.2 17.2c-5.6 3.2-7.4 10.2-4.2 15.8l140 247.4 1-0.6 48.8-29.6-19.6-34.4z M686.4 544l-9.8-17.4-49.6 30 26 46 49.8-30.2z"></path>
                                                </svg>
                                                <span>Consultation</span> <i class="fa fas-drop fa-angle-down"></i></a>
                                        </li>
                                        <ul class="dropdown-ul2 dropdown-ul-n">
                                            <li><a href="#"> New RFQ </a></li>
                                            <li><a href="#"> Respond RFQ </a></li>
                                            <li><a href="#"> My RFQ </a></li>
                                            <li><a href="#"> My Bidding </a></li>
                                        </ul>
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
                                        <span> <sup>
                                                4
                                            </sup> </span>
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
    import userDataMixin from "../../mixins/userDataMixin";

    export default {
        name: "Dashboard",
        beforeCreate() {
            document.body.className = ""
        },
        mixins:[userDataMixin],
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
    @import "main.css";
</style>
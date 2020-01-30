<template>
<!--    <div>-->
<!--        <div class="menu-flex-div  animated animatedFadeInUp fadeInUp">-->
<!--            <div class="main-2-div">-->
<!--                <div class="container-fluid">-->
<!--                    <div class="row">-->
<!--                        <div class="col chat-card">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->

<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    <div class="chat-div">
        <div class="chat-div-1">
            <div class="d-flex">

                <ul id="tabs" class="nav nav-tabs chat-tab fadeIn" role="tablist">
                    <div class="active-pink-3 active-pink-4 mb-2">
                        <input class="form-control search-f" type="text" placeholder="Search" aria-label="Search">
                        <span>6 Contacts</span>
                    </div>
                    <li class="nav-item">
                        <a id="tab-A" href="#pane-A" class="nav-link active" data-toggle="tab" role="tab">

                            <div class="d-flex align-items-center">
                                <div class="chat-img">
                                    <img src="assets/images/75.jpg" alt="">
                                </div>
                                <div class="chat-user  align-items-center ">
                                    <h6>
                                        James Deo
                                    </h6>
                                    <p>
                                        Admininstrator
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="tab-B" href="#pane-B" class="nav-link" data-toggle="tab" role="tab">
                            <div class="d-flex align-items-center">
                                <div class="chat-img">
                                    <img src="assets/images/75.jpg" alt="">
                                </div>
                                <div class="chat-user  align-items-center ">
                                    <h6>
                                        James Deo1
                                    </h6>
                                    <p>
                                        Admininstrator
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="tab-C" href="#pane-C" class="nav-link" data-toggle="tab" role="tab">
                            <div class="d-flex align-items-center">
                                <div class="chat-img">
                                    <img src="assets/images/75.jpg" alt="">
                                </div>
                                <div class="chat-user  align-items-center ">
                                    <h6>
                                        James Deo2
                                    </h6>
                                    <p>
                                        Admininstrator
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="tab-C" href="#pane-d" class="nav-link" data-toggle="tab" role="tab">
                            <div class="d-flex align-items-center">
                                <div class="chat-img">
                                    <img src="assets/images/75.jpg" alt="">
                                </div>
                                <div class="chat-user  align-items-center ">
                                    <h6>
                                        James Deo3
                                    </h6>
                                    <p>
                                        Admininstrator
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <div class="contact-all">

                        <div class="row w-100 align-items-end">
                            <div class="col-sm-6 w-50 text-center fav-con">
                                <a href="#tabs">
                                    <i class="fas fa-id-badge"></i>

                                    <p>
                                        All Contact
                                    </p>
                                </a>
                            </div>
                            <div class="col-sm-6 w-50 text-center fav-con">
                                <a href="#tabs">
                                    <i class="far fa-star"></i>
                                    <p>
                                        Favourite
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </ul>

                <div id="content" class="tab-content" role="tablist">
                    <div id="pane-A" class="card tab-pane fade show active" role="tabpanel" aria-labelledby="tab-A">
                        <div class="card-header" role="tab" id="heading-A">
                            <h5 class="mb-0">
                                <a data-toggle="collapse" href="#collapse-A" data-parent="#content" aria-expanded="true" aria-controls="collapse-A">
                                    Collapsible Group Item A
                                </a>
                            </h5>
                        </div>
                        <div id="collapse-A" class="collapse show" role="tabpanel" aria-labelledby="heading-A">
                            <div class="card-body">
                                <div class="chat-body-saur">
                                    <div class="chat-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="chat-body-div">
                                                    <div class="d-flex align-items-center">
                                                        <div class="chat-body-img">
                                                            <img src="assets/images/75.jpg" alt="">
                                                        </div>
                                                        <div class="chat-body-user-inf d-flex align-items-center pl-4">
                                                            <h2>
                                                                James Deo
                                                            </h2>

                                                            <p class="pl-2"> <span class="dot-chat pl-2"></span> Online</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 d-flex align-items-center justify-content-end">
                                                <div class="chat-body-dots">
                                                    <button class="button-chat sub-menu4">
                                                        <i class="fas fas-dot-chat fa-ellipsis-v"></i>
                                                    </button>
                                                    <ul class="dropdown-ul4 dropdown-ul-n12">
                                                        <li> <a href="#"> Delete Conversation </a> </li>
                                                        <li> <a href="#"> Option 1</a> </li>
                                                        <li> <a href="#"> Option 2</a> </li>
                                                        <li> <a href="#"> Option 3 </a> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-body">
                                        <div class="row">
                                            <div class="col-sm-12 d-flex align-items-center mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4 left">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4 left">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="search-button">
                                            <div class="active-pink-3 active-pink-41 mt-3">
                                                <input class="form-control search-text" type="text" placeholder="Type a Message" aria-label="Search">
                                                <button class="msg_send_btn">
                                                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="pane-B" class="card tab-pane fade" role="tabpanel" aria-labelledby="tab-B">
                        <div class="card-header" role="tab" id="heading-B">
                            <h5 class="mb-0">
                                <a class="collapsed" data-toggle="collapse" href="#collapse-B" data-parent="#content" aria-expanded="false" aria-controls="collapse-B">
                                    Collapsible Group Item B
                                </a>
                            </h5>
                        </div>
                        <div id="collapse-B" class="collapse" role="tabpanel" aria-labelledby="heading-B">
                            <div class="card-body">
                                <div class="chat-body-saur">
                                    <div class="chat-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="chat-body-div">
                                                    <div class="d-flex align-items-center">
                                                        <div class="chat-body-img">
                                                            <img src="assets/images/75.jpg" alt="">
                                                        </div>
                                                        <div class="chat-body-user-inf d-flex align-items-center pl-4">
                                                            <h2>
                                                                James Deo1
                                                            </h2>

                                                            <p class="pl-2"> <span class="dot-chat pl-2"></span> Online</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 d-flex align-items-center justify-content-end">
                                                <div class="chat-body-dots">
                                                    <button class="button-chat sub-menu4">
                                                        <i class="fas fas-dot-chat fa-ellipsis-v"></i>
                                                    </button>
                                                    <ul class="dropdown-ul4 dropdown-ul-n12">
                                                        <li> <a href="#"> Delete Conversation </a> </li>
                                                        <li> <a href="#"> Option 1</a> </li>
                                                        <li> <a href="#"> Option 2</a> </li>
                                                        <li> <a href="#"> Option 3 </a> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-body">
                                        <div class="row">
                                            <div class="col-sm-12 d-flex align-items-center mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4 left">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4 left">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="search-button">
                                            <div class="active-pink-3 active-pink-41 mt-3">
                                                <input class="form-control search-text" type="text" placeholder="Type a Message" aria-label="Search">
                                                <button class="msg_send_btn">
                                                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="pane-C" class="card tab-pane fade" role="tabpanel" aria-labelledby="tab-C">
                        <div class="card-header" role="tab" id="heading-C">
                            <h5 class="mb-0">
                                <a class="collapsed" data-toggle="collapse" href="#collapse-C" data-parent="#content" aria-expanded="false" aria-controls="collapse-C">
                                    Collapsible Group Item C
                                </a>
                            </h5>
                        </div>
                        <div id="collapse-C" class="collapse" role="tabpanel" aria-labelledby="heading-C">
                            <div class="card-body">
                                <div class="chat-body-saur">
                                    <div class="chat-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="chat-body-div">
                                                    <div class="d-flex align-items-center">
                                                        <div class="chat-body-img">
                                                            <img src="assets/images/75.jpg" alt="">
                                                        </div>
                                                        <div class="chat-body-user-inf d-flex align-items-center pl-4">
                                                            <h2>
                                                                James Deo2
                                                            </h2>

                                                            <p class="pl-2"> <span class="dot-chat pl-2"></span> Online</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 d-flex align-items-center justify-content-end">
                                                <div class="chat-body-dots">
                                                    <button class="button-chat sub-menu4">
                                                        <i class="fas fas-dot-chat fa-ellipsis-v"></i>
                                                    </button>
                                                    <ul class="dropdown-ul4 dropdown-ul-n12">
                                                        <li> <a href="#"> Delete Conversation </a> </li>
                                                        <li> <a href="#"> Option 1</a> </li>
                                                        <li> <a href="#"> Option 2</a> </li>
                                                        <li> <a href="#"> Option 3 </a> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-body">
                                        <div class="row">
                                            <div class="col-sm-12 d-flex align-items-center mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4 left">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4 left">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="search-button">
                                            <div class="active-pink-3 active-pink-41 mt-3">
                                                <input class="form-control search-text" type="text" placeholder="Type a Message" aria-label="Search">
                                                <button class="msg_send_btn">
                                                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pane-d" class="card tab-pane fade" role="tabpanel" aria-labelledby="tab-C">
                        <div class="card-header" role="tab" id="heading-C">
                            <h5 class="mb-0">
                                <a class="collapsed" data-toggle="collapse" href="#collapse-C" data-parent="#content" aria-expanded="false" aria-controls="collapse-C">
                                    Collapsible Group Item C
                                </a>
                            </h5>
                        </div>
                        <div id="collapse-C" class="collapse" role="tabpanel" aria-labelledby="heading-C">
                            <div class="card-body">
                                <div class="chat-body-saur">
                                    <div class="chat-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="chat-body-div">
                                                    <div class="d-flex align-items-center">
                                                        <div class="chat-body-img">
                                                            <img src="assets/images/75.jpg" alt="">
                                                        </div>
                                                        <div class="chat-body-user-inf d-flex align-items-center pl-4">
                                                            <h2>
                                                                James Deo3
                                                            </h2>

                                                            <p class="pl-2"> <span class="dot-chat pl-2"></span> Online</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 d-flex align-items-center justify-content-end">
                                                <div class="chat-body-dots">
                                                    <button class="button-chat sub-menu4">
                                                        <i class="fas fas-dot-chat fa-ellipsis-v"></i>
                                                    </button>
                                                    <ul class="dropdown-ul4 dropdown-ul-n12">
                                                        <li> <a href="#"> Delete Conversation </a> </li>
                                                        <li> <a href="#"> Option 1</a> </li>
                                                        <li> <a href="#"> Option 2</a> </li>
                                                        <li> <a href="#"> Option 3 </a> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-body">
                                        <div class="row">
                                            <div class="col-sm-12 d-flex align-items-center mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4 left">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="body-chat-div-img">
                                                        <img src="assets/images/75.jpg" alt="">
                                                    </div>
                                                    <div class="body-chat-div-text pl-4 left">
                                                        <small>May 29, 2019 04:15 Pm</small><br>
                                                        <h6>
                                                            Lorem ipsum dolor sit amet
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="search-button">
                                            <div class="active-pink-3 active-pink-41 mt-3">
                                                <input class="form-control search-text" type="text" placeholder="Type a Message" aria-label="Search">
                                                <button class="msg_send_btn">
                                                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import ChatList from "./ChatList";
    import MessageArea from "./MessageArea";

    export default {
        name: "Chat",
        components: {
            "chat-list": ChatList,
            "message-area": MessageArea
        }
    };
</script>

<style scoped>
    /*.main-2-div {*/
    /*    margin-top: -2px;*/
    /*}*/
    /*.container-fluid{*/
    /*    width:95% !important;*/
    /*}*/
    /*.chat-card {*/
    /*    margin-top: -35px !important;*/
    /*    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);*/
    /*    background: #fff;*/
    /*    border-radius: 12px;*/
    /*    max-height: 100vh;*/
    /*    min-height: 90vh;*/
    /*    opacity: 0.98;*/
    /*}*/




    .nav-tabs {
        display: none;
    }

    @media (min-width: 768px) {
        .nav-tabs {
            display: flex;
            flex-flow: column nowrap;
        }
        .chat-tab {
            border-bottom: none;
            border-right: 1px solid #ddd;
            display: flex;
            width: 40%;
            background: #f6f6f6;
            padding: 20px 0px;
            height: 600px;
        }

        /* .nav-tabs {
          margin: 0 15px;
        } */

        .nav-tabs .nav-item + .nav-item {
            margin-top: 0.25rem;
        }
        .chat-div .nav-link {
            transition: border-color 0.125s ease-in;
            white-space: nowrap;
        }
        .nav-tabs .nav-link:hover {
            background-color: #f7f7f7;
            border-color: transparent;
        }
        .nav-tabs .nav-link.active {
            border-bottom-color: #ddd;
            border-right-color: #fff;
            border-bottom-left-radius: 0.25rem;
            border-top-right-radius: 0;
            margin-right: -1px;
        }
        .nav-tabs .nav-link.active:hover {
            background-color: #fff;
            border-color: #0275d8 #fff #0275d8 #0275d8;
        }

        .card {
            border: none;
        }

        .card .card-header {
            display: none;
        }

        .card .collapse {
            display: block;
        }
    }

    @media (max-width: 767px) {
        .tab-pane {
            display: block !important;
            opacity: 1;
        }
    }


    .chat-img img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .chat-user {
        padding-left: 14px;
    }
    .chat-div {


        border-radius: 20px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .chat-body-img img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 0 2px 20px -5px #EF6C00;
    }
    div#content {
        width: 100%;
        height: 600px;
    }
    .chat-body-user-inf h2 {
        font-size: 1.25rem;
        font-family: Open Sans,sans-serif;
        font-weight: 600;
        line-height: 1.6;
        margin-bottom: 0;
    }
    span.dot-chat {
        width: 10px;
        border: 1px solid #fff;
        height: 10px;
        display: inline-block;
        margin-right: 2px;
        border-radius: 50%;
        background: #CDDC39;
    }
    .chat-body-user-inf.d-flex p {
        font-size: 12px;
        color: #00000082;
        margin-bottom: -3px;
    }
    button.button-chat {
        background: none;
        border: none;
    }
    .body-chat-div-img img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .body-chat-div-text.pl-4 h6 {
        box-shadow: 0px 1px 3px 0px rgba(80,80,80, 0.2), 0px 1px 1px 0px rgba(80,80,80, 0.14), 0px 2px 1px -1px rgba(80,80,80, 0.12);
        background-color: #F3E5F5;
        display: inline-block;
        padding: 10px;
        border-radius: 10px;
        border-top-left-radius: 0;
        margin-top: 2px;
    }

    .body-chat-div-text.pl-4 h6:after{
        top: 21;
        left: 16px;
        content: "";
        position: absolute;
        border-right: 10px solid #F3E5F5;
        border-bottom: 15px solid transparent;
    }
    .body-chat-div-text.pl-4 {
        position: relative;
    }
    .body-chat-div-text.pl-4.left h6 {
        background: #fff3e0;
        border-top-right-radius: 0;
    }
    .body-chat-div-text.pl-4.left h6:after {
        right: 0;
        border-right: 10px solid #FFF3E0;
    }
    .body-chat-div-text small {
        color: #00000063;
    }
    .chat-body {
        margin-bottom: 20px;
    }
    .chat-text-body {
        height: 500px;
        position: relative;
        overflow: hidden;
        overflow-y: auto;
    }
    input.form-control.search-f {
        border-radius: 16px;
        width: 90%;
        margin: 0 auto;
    }
    .active-pink-3.active-pink-4 span {
        color: #80808082;
        display: flex;
        justify-content: center;
        margin-top: 5px;
    }
    .chat-user.align-items-center p {
        margin-bottom: 0px;
    }
    input.form-control.search-text {
        border-radius: 18px;
        position: absolute;
        bottom: 30;
    }
    .msg_send_btn {
        background: #05728f none repeat scroll 0 0;
        border: medium none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        height: 25px;
        position: absolute;
        right: 13px;
        /* top: 11px; */
        width: 26px;
        bottom: 38px;
    }
    .active-pink-3.active-pink-41.mt-3 {

        overflow: hidden;
    }
    .chat-user.align-items-center h6 {
        color: #00000091;
        margin-bottom: 2px;
    }
    .chat-user.align-items-center p {
        color: #00000091;
    }
    .tab-pane{
        background: #ffffffed !important;
        border-radius: unset !important;
        box-shadow: unset !important;
        height: 600px !important;
    }
    .chat-tab .nav-link.active h6 {

        box-shadow: unset !important;
        border-radius: 4px;
        background-image: unset !important;
        color: #fff !important;
        margin-bottom: 2px;
    }
    .chat-tab .nav-link.active p {

        box-shadow: unset !important;
        border-radius: 4px;
        background-image: unset !important;
        color: #fff !important;
    }
    .chat-tab .nav-link {
        border-color: transparent !important;
        background: transparent !important;
        box-shadow:unset !important;
        border-radius: 4px;
    }
    .chat-tab a {
        padding: 10px 20px;
    }
    .contact-all {
        position: absolute;
        bottom: 0;
        width: 28%;
    }
    ul#Commentary li {
        list-style-type: none;
    }
    ul#Commentary{
        padding-left: 0px;
    }
    .contact-all a {
        padding: 0;
    }
    .contact-all .fas {
        width: 30px;
        background-image: linear-gradient(#0a2b4f, #af1212) !important;
        color: #fff !important;
        border-radius: 50%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .contact-all .far {
        width: 30px;
        background-image: linear-gradient(#0a2b4f, #af1212) !important;
        color: #fff !important;
        border-radius: 50%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .contact-all p {
        color: gray;
        margin-top: 5px;
    }
    ul.dropdown-ul4.dropdown-ul-n12 {
        padding-left: 0;
        background: #fff;
        display: none;
        position: absolute;
        right: 11px;
        top: 48px;
        border-radius: 4px;
    }
    ul.dropdown-ul4.dropdown-ul-n12 li{
        list-style-type: none;
        padding: 10px 20px;
    }
    ul.dropdown-ul4.dropdown-ul-n12 li {
        list-style-type: none;
        padding: 4px 20px;
        color: gray;
    }
    ul.dropdown-ul4.dropdown-ul-n12 a {

        color: gray;
    }
</style>
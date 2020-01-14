<template>
    <!-- Profile Settings -->
    <div class="d-flex flex-column w-100 h-100" id="profile-settings">
        <div class="row d-flex flex-row align-items-center p-2 m-0" style="background:#009688; min-height:65px;">
            <i class="fas fa-arrow-left p-2 mx-3 my-1 text-white" style="font-size: 1.5rem; cursor: pointer;" onclick="hideProfileSettings()"></i>
            <div class="text-white font-weight-bold">Profile</div>
        </div>
        <div class="d-flex flex-column" style="overflow:auto;">
            <img alt="Profile Photo" class="img-fluid rounded-circle my-5 justify-self-center mx-auto" id="profile-pic">
            <input type="file" id="profile-pic-input" class="d-none">
            <div class="bg-white px-3 py-2">
                <div class="text-muted mb-2"><label for="input-name">Your Name</label></div>
                <input type="text" name="name" id="input-name" class="w-100 border-0 py-2 profile-input">
            </div>
            <div class="text-muted p-3 small">
                This is not your username or pin. This name will be visible to your WhatsApp contacts.
            </div>
            <div class="bg-white px-3 py-2">
                <div class="text-muted mb-2"><label for="input-about">About</label></div>
                <input type="text" name="name" id="input-about" value="" class="w-100 border-0 py-2 profile-input">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Settings"
    }
</script>

<style >
</style>
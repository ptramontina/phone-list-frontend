<template>
   <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Welcome</h3>
                    <p class="subtitle has-text-grey">Insert your credentials</p>
                    <div class="box">
                        <figure class="avatar">
                            <!-- <img class="logo" src="../../assets/img/logo-simple.png"> -->
                            <i class="far fa-address-book has-text-info" style="font-size: 100px"></i>                            
                        </figure>
                        <br>
                        <form method="POST" action="/login" aria-label="Login">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" 
                                            id="login" 
                                            type="text" 
                                            name="login" value="" 
                                            placeholder="User or e-mail"
                                            required autofocus>
                                </div>
                            </div>
                            
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" 
                                            id="password" 
                                            type="password" 
                                            name="password" value="" 
                                            placeholder="Password"
                                            required>
                                </div>
                            </div>                                   
                            <div class="field">
                                <div class="control has-text-centered">
                                    <span class="has-text-danger" role="alert">
                                        <strong>Invalid credentials</strong>                                                    
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-block is-info is-large is-fullwidth">Login</button>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                                <input type="checkbox">
                                    Remember me
                                </label>
                            </div>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="../">Register</a> &nbsp;·&nbsp;
                        <a href="../">Forgot password?</a> &nbsp;·&nbsp;
                        <a href="../">Help</a>
                    </p>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
export default {

}
</script>

<style>

</style>
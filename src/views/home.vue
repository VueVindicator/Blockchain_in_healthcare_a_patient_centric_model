<template>
    <div class="Home">
        <Header></Header>
        <main class="main-content">

            <section class="section bg-gray overflow-hidden">
                <div class="container-fluid">
                    <div class="row gap-y align-items-center">
        
                        <div class="col-md-4 mx-auto text-center">
                            <img class="border shadow-7" src="/src/assets/img/preview/shot-3.png" alt="..." data-aos="fade-right">
                        </div>
            
            
                        <div class="col-md-4 mx-auto">
                            <h3>A more patient centric system</h3>
                            <p>Our platform improves patient's control over their records by making them the sole authority in the approval of access to their records</p>
                            <a href="#">Read More <i class="ti-angle-right fs-10 ml-1"></i></a>
                        </div>
        
                    </div>
                </div>
            </section>
      
            <section class="section overflow-hidden">
                <div class="container-fluid">
                    <div class="row gap-y align-items-center">
        
                        <div class="col-md-4 mx-auto text-center">
                            <img class="border shadow-7" src="/src/assets/img/preview/shot-2.png" alt="..." data-aos="fade-left">
                        </div>
            
            
                        <div class="col-md-4 mx-auto order-md-first">
                            <h3>Explore Blockchain in healthcare</h3>
                            <p>Every transaction on the system is recorded on the blockchain to offer foster transparency and interoperability amongst users of the system.</p>
                            <a href="#">Read More <i class="ti-angle-right fs-10 ml-1"></i></a>
                        </div>
        
                    </div>
                </div>
            </section>
        </main>
        <Footer></Footer>
    </div>
</template>
  
<script>
import Header from '../components/header';
import Footer from '../components/footer';
export default {
    name: 'Home',
    components: {
        Header: Header,
        Footer: Footer
    },
    data () {
        return {
            msg: 'Welcome to Home Page'
        }
    }
}
</script>
  
<style>  
</style>
  
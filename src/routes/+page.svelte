<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";
    import {faArrowUp, faCheck} from "@fortawesome/free-solid-svg-icons";
</script>
<div class="bg-white">
  <Navbar/>
  <!-- Hero Section -->
  <div class="flex justify-center">
      <section class="bg-accent-green py-12 px-8 mt-6 rounded-md">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <!-- Text -->
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Neighbors with <span class="text-green-600">Talent</span>, right next door!
            </h1>
            <p class="text-gray-600 mb-6">
              Choose the best deal among 50,000 people and pros by requesting a service!
            </p>
  
            <div class="flex flex-wrap gap-3">
              <button class="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                Get a Service
              </button>
              <button class="border border-green-600 text-green-600 px-5 py-2 rounded-lg font-semibold hover:bg-green-100 transition">
                Become a Pro
              </button>
            </div>
  
            <div class="mt-6 flex gap-6 text-gray-500 text-sm">
              <div><span class="font-bold text-gray-800">50,000+</span> Pros</div>
              <div><span class="font-bold text-gray-800">10,000+</span> Services</div>
            </div>
          </div>
  
          <!-- Image grid -->
          <div class="grid grid-cols-2 gap-4">
            <img src="./image1.png" alt="worker1" class="rounded-xl object-cover">
            <img src="./image2.png" alt="worker2" class="rounded-xl object-cover ">
            <img src="./image3.png" alt="worker3" class="rounded-xl object-cover">
            <img src="./image4.png" alt="worker4" class="rounded-xl object-cover">
          </div>
        </div>
      </section>
  </div>
  
  <!-- Categories -->
  <section class="max-w-6xl mx-auto px-6 py-12">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">What are you <span class="text-green-600">looking</span> for?</h2>
      <button class="text-green-600 font-semibold border border-green-600 rounded-lg px-4 py-1 hover:bg-green-50">
        See All
      </button>
    </div>
  
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition h-60 relative">
          <img src="./image5.png" alt="plumber" class="w-full  object-cover">
          <div class="p-3 text-center font-semibold text-gray-700"></div>
          <!-- Badge -->
           <div class="bg-gray-100 absolute bottom-5 w-60 rounded-sm flex py-2 px-3 ms-2 justify-between items-center">
              <p class="text-md font-semibold">Plumbering</p>
              <span class="bg-green-300 p-2 rounded-full"><FontAwesomeIcon icon={faArrowUp} class="rotate-30"/></span>
           </div>
        </div>
  
        <div class="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition h-60 relative">
          <img src="./image6.png" alt="gardener" class="w-full h-60 object-cover">
          <div class="p-3 text-center font-semibold text-gray-700"></div>
          <!-- Badge -->
           <div class="bg-gray-100 absolute bottom-5 w-60 rounded-sm flex py-2 px-3 ms-2 justify-between items-center">
              <p class="text-md font-semibold">Gardening</p>
              <span class="bg-green-300 p-2 rounded-full"><FontAwesomeIcon icon={faArrowUp} class="rotate-30"/></span>
           </div>
        </div>
  
        <div class="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition h-60 relative">
          <img src="./image7.png" alt="cooking" class="w-full h-60 object-cover">
          <div class="p-3 text-center font-semibold text-gray-700"></div>
          <!-- Badge -->
           <div class="bg-gray-100 absolute bottom-5 w-60 rounded-sm flex py-2 px-3 ms-2 justify-between items-center">
              <p class="text-md font-semibold">Cooking</p>
              <span class="bg-green-300 p-2 rounded-full"><FontAwesomeIcon icon={faArrowUp} class="rotate-30"/></span>
           </div>
        </div>
  
        <div class="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition h-60 relative">
          <img src="./image8.png" alt="animals" class="w-full h-60 object-cover">
          <div class="p-3 text-center font-semibold text-gray-700"></div>
          <!-- Badge -->
           <div class="bg-gray-100 absolute bottom-5 w-60 rounded-sm flex py-2 px-3 ms-2 justify-between items-center">
              <p class="text-md font-semibold">Animals</p>
              <span class="bg-green-300 p-2 rounded-full"><FontAwesomeIcon icon={faArrowUp} class="rotate-30"/></span>
           </div>
        </div>
    </div>
  </section>
  
  <!-- Upload Request -->
  <div class="flex justify-center">
      <section class="bg-accent-gold py-12 px-8 rounded-md">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          <!-- Left -->
          <div>
            <h3 class="text-4xl font-bold text-gray-800 mb-3">Upload your <span class="text-green-600">first request</span>.</h3>
            <p class="text-gray-600 mb-6">
              Over 50,000 private and professional service providers throughout Africa!
            </p>
  
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-center gap-2"><span class="bg-green-600 text-xl text-white px-3 py-1 rounded-full">1</span> Describe your need</li>
              <li class="flex items-center gap-2"><span class="bg-green-600 text-xl text-white px-3 py-1 rounded-full">2</span> Recieve offers quickly</li>
              <li class="flex items-center gap-2"><span class="bg-green-600 text-xl text-white px-3 py-1 rounded-full">3</span> Pay and rate the service</li>
            </ul>
  
            <a href="/login">
                <button class="mt-6 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                  Request a Service
                </button>
            </a>
          </div>
  
          <!-- Right -->
          <div class="bg-white shadow rounded-2xl p-6">
            <h4 class="font-semibold text-gray-800 mb-4">Most Popular Requests</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between border p-3 rounded-lg">
                <div>
                  <p class="font-semibold text-gray-700">Small Job Work</p>
                  <p class="text-sm text-gray-500">Handyman</p>
                </div>
                <span class="font-semibold text-green-600">$90</span>
              </div>
  
              <div class="flex items-center justify-between border p-3 rounded-lg">
                <div>
                  <p class="font-semibold text-gray-700">Small Job Work</p>
                  <p class="text-sm text-gray-500">Cleaning</p>
                </div>
                <span class="font-semibold text-green-600">$26</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
  
  <!-- CTA(requester) Section Grid -->
  <div class="flex justify-center my-15">
      <section class="bg-base-200 py-12 px-8 border-3 border-primary-green rounded-md relative">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 items-start">
         <div class="flex flex-col justify-center space-y-3">
          <div class="flex items-center justify-center bg-primary-green w-25 h-25 p-5 rounded-full mx-auto">
              <img src="./Vector1.png" alt="Vector1">
          </div>
              <h1 class="text-center text-xl font-semibold text-green-500">Verified and Qualified<br> Profiles</h1>
              <p class="text-center">Want to know who you're dealing with? So do we! That's why we verify the identity of our service providers.</p>
         </div>
         <div class="flex flex-col justify-center space-y-3">
          <div class="flex items-center justify-center bg-primary-green w-25 h-25 p-5 rounded-full mx-auto">
              <img src="./Vector2.png" alt="Vector2">
          </div>
              <h1 class="text-center text-xl font-semibold text-green-500">Freedom of<br> Mind</h1>
              <p class="text-center">A guaranteed service is worth two! That's why they are all covered  by personal injury & property.</p>
         </div>
         <div class="flex flex-col justify-center space-y-3">
          <div class="flex items-center justify-center bg-primary-green w-25 h-25 p-5 rounded-full mx-auto">
              <img src="./Vector3.png" alt="Vector3">
          </div>
              <h1 class="text-center text-xl font-semibold text-green-500">Approved<br> Platform</h1>
              <p class="text-center">Our platform is recognized by the Belgian government. All services are declared and paid online.</p>
         </div>
         <div class="flex flex-col justify-center space-y-3">
          <div class="flex items-center justify-center bg-primary-green w-25 h-25 p-5 rounded-full mx-auto">
              <img src="./Vector4.png" alt="Vector4">
          </div>
              <h1 class="text-center text-xl font-semibold text-green-500">Support at<br> Disposal</h1>
              <p class="text-center">We go beyond connecting you.
  Our team guides you from registration to service declaration.</p>
         </div>
        </div>
        <a href="/login"><button class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-white bg-primary-green py-2 px-3 rounded-lg">Request a Service</button></a>
      </section>
  </div>
  
  <!-- CTA(provider) Section Grid -->
  <section class="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 my-15 ">
      <div class="bg-accent-green rounded-lg px-8 py-15 my-12 space-y-7">
          <h3 class="text-2xl font-bold">Use your skills to make money, whether<br> you're a professional or an individual!</h3>
          <p>Follow the steps to register:</p>
          <ul class="space-y-3 text-gray-700">
              <li class="flex items-center gap-2"><span class="bg-green-600 text-xl text-white px-3 py-2 rounded-full"><FontAwesomeIcon icon={faCheck} class="text-[15px] text-gray-300"/></span> Over 4,000 jobs every week for independent contractors and individuals</li>
              <li class="flex items-center gap-2"><span class="bg-green-600 text-xl text-white px-3 py-2 rounded-full"><FontAwesomeIcon icon={faCheck} class="text-[15px] text-gray-300"/></span> Set your own hours and decide how much you want to be paid.</li>
              <li class="flex items-center gap-2"><span class="bg-green-600 text-xl text-white px-3 py-2 rounded-full"><FontAwesomeIcon icon={faCheck} class="text-[15px] text-gray-300"/></span> Get paid within 48 hours for your services.</li>
            </ul>
            <button class="text-white bg-primary-green py-2 px-3 rounded-lg">Become a Service Provider</button>
      </div>
      <div class="hidden md:flex flex-row relative">
          <span class="rounded-md bg-accent-green absolute left-5 top-1/3 z-50 px-5 py-2 text-left">
              <h4 class="font-semibold text-lg px-1">New Job</h4>
              <p class="text-sm">2 Notification</p>
          </span>
          <span class="rounded-md bg-primary-gold absolute right-10 z-50 px-5 py-2 text-left">
              <h4 class="font-semibold text-lg px-1">You won<br>2025</h4>
              <p class="text-xs">$250</p>
          </span>
          <span class="rounded-md bg-gray-300 absolute bottom-1/4 right-10 z-50 px-5 py-2 text-left">
              <h4 class="font-semibold text-lg px-1">Payment Received</h4>
              <p class="text-xs">$50</p>
          </span>
          <img src="image11.png" alt="Man worker" class="absolute -left-5">
          <img src="image12.png" alt="Woman worker" class="absolute -right-5">
      </div>
  </section>
  
  <!-- Steps to register section -->
   <div class="flex justify-center">
      <section class="bg-accent-gold py-12 px-12 rounded-md">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          <!-- Left -->
          <div>
            <img src="image13.png" alt="image13" class="w-90">
          </div>
  
          <!-- Right -->
          <div class="">
            <ul class="space-y-5 text-gray-700">
              <li class="flex items-center gap-2 relative"><span class="bg-primary-gold text-xl text-white p-2 rounded-full absolute top-1 left-0"></span> <span class="flex flex-col ms-5">
                  <p class="text-primary-green font-semibold text-lg">User Registration:</p>
                      <p>Clients and service providers create accounts on the GoWork platform (mobile or web) by providing essential details—name, contact information, and role selection (client or provider)</p>
              </span>
              </li>
              <li class="flex items-center gap-2 relative"><span class="bg-primary-gold text-xl text-white p-2 rounded-full absolute top-1 left-0"></span> <span class="flex flex-col ms-5">
                  <p class="text-primary-green font-semibold text-lg">Service Requests:</p>
                      <p>Clients submit service requests (e.g., plumbing, gardening, cooking) via a simple form detailing service type, description, location, and requirements.</p>
              </span>
              </li><li class="flex items-center gap-2 relative"><span class="bg-primary-gold text-xl text-white p-2 rounded-full absolute top-1 left-0"></span> <span class="flex flex-col ms-5">
                  <p class="text-primary-green font-semibold text-lg">Provider Proposals:</p>
                      <p>Verified service providers receive instant notifications of new requests, review details, and submit proposals including pricing and availability.</p>
              </span>
              </li><li class="flex items-center gap-2 relative"><span class="bg-primary-gold text-xl text-white p-2 rounded-full absolute top-1 left-0"></span> <span class="flex flex-col ms-5">
                  <p class="text-primary-green font-semibold text-lg">Proposal Selection:</p>
                      <p>Clients review multiple proposals, compare profiles, ratings, and prices, and select the most suitable provider. They can communicate directly through the platform for clarifications.</p>
              </span>
              </li><li class="flex items-center gap-2 relative"><span class="bg-primary-gold text-xl text-white p-2 rounded-full absolute top-1 left-0"></span> <span class="flex flex-col ms-5">
                  <p class="text-primary-green font-semibold text-lg">Job Execution & Payment:</p>
                      <p>The provider completes the job as agreed. Payment is processed securely via integrated Stripe and mobile money systems.</p>
              </span>
              </li><li class="flex items-center gap-2 relative"><span class="bg-primary-gold text-xl text-white p-2 rounded-full absolute top-1 left-0"></span> <span class="flex flex-col ms-5">
                  <p class="text-primary-green font-semibold text-lg">Reviews and Ratings:</p>
                      <p>Both clients and providers leave feedback to maintain transparency, quality, and trust.)</p>
              </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
  </div>
  <Footer/>
</div>

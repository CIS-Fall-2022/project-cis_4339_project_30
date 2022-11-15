<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/intakeform">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Client Intake Form
              </router-link>
            </li>
            <li>
              <router-link to="/eventform">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <li>
              <router-link to="/findclient">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/findEvents">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="
          background: linear-gradient(250deg, #C8102E 70%, #efecec 50.6%);
        "
      >
        <h1 class="mr-20 text-3xl text-white">Dataplataform</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<!--connection for organization, do methods, -->
<script>

export default {
  name: "App",
  components :{
    //do i need a component for the name?
    
  },
  data ()
  {
    return {

    }
  }
  
  //let requestURL = fetch('http://localhost:3000/organizationdata/');
  //requestURL.then(response => response.json())
  //.then(name => console.log(name))}

  //the request url is a get 
 // http://localhost:3000/organizationdata/
 //https://www.geeksforgeeks.org/javascript-fetch-method/#:~:text=The%20fetch()%20method%20requires,then(response%20%3D%3E%20response.
 //https://medium.com/swlh/making-use-of-apis-in-your-front-end-c168e343bea3 
 
  /*let requestURL = fetch ("http://localhost:3000/organizationdata/");
  requestURL.then(res => res.json().then(d => { console.log(d)}))
    }
  }.catch(error => {
    console.log(error)
  })*/
};
</script>

<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>


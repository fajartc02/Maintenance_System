<template>
  <div
    id="containerMenu"
    class="card w-100"
    style="
      position: fixed;
      bottom: 0;
      left: 0;
      max-height: 65px;
      z-index: 1 !important;
    "
  >
    <div
      id="iconPopup"
      class="card rounded-circle shadow d-flex justify-content-center"
      @click="show()"
      style="
        width: 30px;
        height: 30px;
        position: absolute;
        left: 46vw;
        bottom: 90%;
        color: #008c76ff;
        z-index: 1;
      "
    >
      <i
        class="fa fa-arrow-circle-up"
        style="font-size: 20px"
        aria-hidden="true"
      ></i>
    </div>
    <div class="d-flex flex-wrap justify-content-around">
      <Menu v-for="menu in listMenu" :key="menu.title" :propsMenu="menu" />
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "ContainerMenu",
  data() {
    return {
      listMenu: [
        {
          title: "Problem History",
          img:
            "https://cdn2.iconfinder.com/data/icons/plump-by-zerode_/256/Folder-URL-History-icon.png",
          link: "/problemHistory",
          badges: true,
        },
        {
          title: "Realtime Pareto",
          img:
            "https://cdn0.iconfinder.com/data/icons/accounting-and-tax/48/17-512.png",
          link: "/realtimePareto",
        },
        {
          title: "Symptomp Mgmt.",
          img:
            "https://cdn0.iconfinder.com/data/icons/Utilize/512/Activity_Monitor.png",
          link: "/symptompMgmt",
        },
        {
          title: "Henkaten History",
          img:
            "https://iconbug.com/data/75/256/59dd83353b8e6ade996ff4cdd8f99ad0.png",
          link: "/henkaten",
        },
        {
          title: "Register Mc",
          img:
            "https://labmidwest.com/wp-content/uploads/2019/07/IMG_9014-fixed-perspective-2-web-500x500-1.png",
          link: "/registerNewMachine",
        },
        {
          title: "Cost Machines",
          img: "https://media2.giphy.com/media/hVa2dEN4BLg3fQHWjJ/source.gif",
          link: "#",
        },
        {
          title: "TPM Monitoring",
          img:
            "https://cdn3.iconfinder.com/data/icons/eziconic-v1-0/256/03.png",
          link: "/tpmMonitoring",
        },
        {
          title: "CM Followup",
          img:
            "https://images.assetsdelivery.com/compings_v2/ahasoft2000/ahasoft20001601/ahasoft2000160101030.jpg",
          link: "/cmFollowup",
        },
      ],
      isShow: true,
    };
  },
  components: {
    Menu,
  },
  methods: {
    show() {
      if (this.isShow) {
        document.getElementById("containerMenu").style.minHeight = "125px";
        document.getElementById("iconPopup").style.transform = "rotate(180deg)";
        this.isShow = false;
      } else {
        this.isShow = true;
        document.getElementById("containerMenu").style.minHeight = "65px";
        document.getElementById("iconPopup").style.transform = "rotate(0deg)";
      }
    },
  },
};
</script>

<style scoped>
@keyframes colorChanges {
  from {
    color: #ffdde2ff;
  }
  to {
    color: #008c76ff;
  }
}

/* The element to apply the animation to */
#iconPopup {
  width: 100px;
  height: 100px;
  animation-name: colorChanges;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  transition: transform, ease-in 0.5s;
  transform: rotate(0deg);
}
#iconPopup:active {
  background-color: #343a40;
}
#containerMenu {
  min-height: 65px;
  transition: min-height 0.2s;
}
.col-3 {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
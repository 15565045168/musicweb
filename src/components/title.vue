<template>
  <div class="title">
    <ul>
      <li></li>
      <li @click="gohome('home')" :class="[activeid == 'home' ? 'active' : '']">
        首页
      </li>
      <li
        @click="gosinglist('songlist')"
        :class="[activeid == 'songlist' ? 'active' : '']"
      >
        歌单
      </li>
      <li
        @click="gosinger('singer')"
        :class="[activeid == 'singer' ? 'active' : '']"
      >
        歌手
      </li>
      <li
        @click="gomymusic('mymusic')"
        :class="[activeid == 'mymusic' ? 'active' : '']"
      >
        我的音乐
      </li>
      <li>
        <input
          type="text"
          active-class="active"
          @input="select"
          v-model="text"
        /><el-button
          type="primary"
          icon="el-icon-search"
          @click="gosearch('search')"
          >搜索</el-button
        >
        <div class="search">
          <p
            v-for="(item, index) in singer"
            :key="index"
            @click="gosingerpage(item)"
          >
            <span>{{ item.name }}</span
            ><span>歌手</span>
          </p>
          <p v-for="(item, index) in music" :key="index" @click="gomusic(item)">
            <span>{{ item.name }}</span
            ><span>音乐</span>
          </p>
        </div>
      </li>
      <div v-if="$store.state.status">图片</div>
      <div v-else>
        <li
          @click="gologin('login')"
          to="/login"
          :class="[activeid == 'login' ? 'active' : '']"
        >
          登录
        </li>
        <li
          @click="goregister('register')"
          to="/register"
          :class="[activeid == 'register' ? 'active' : '']"
        >
          注册
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import merge from "webpack-merge";

export default {
  data() {
    return {
      text: "",
      activeid: "",
      singer: [],
      music: [],
    };
  },
  created() {
    switch (this.$route.path) {
      case "/":
        this.activeid = "home";
        break;
      case "/home":
        this.activeid = "home";
        break;
      case "/songlist":
        this.activeid = "songlist";
        break;
      case "/singer":
        this.activeid = "singer";
        break;
      case "/mymusic":
        this.activeid = "mymusic";
        break;
      case "/search":
        this.activeid = "";
        break;
      case "/login":
        this.activeid = "login";
        break;
      case "/register":
        this.activeid = "register";
        break;
    }
  },
  methods: {
    gohome(options) {
      this.activeid = options;
      this.$router
        .push({
          path: "/",
        })
        .catch(() => {});
    },
    gosinglist(options) {
      this.activeid = options;
      this.$router
        .push({
          path: "/" + options,
        })
        .catch(() => {});
    },
    gosinger(options) {
      this.activeid = options;
      this.$router
        .push({
          path: "/" + options,
        })
        .catch(() => {});
    },
    gomymusic(options) {
      this.activeid = options;
      this.$router
        .push({
          path: "/" + options,
        })
        .catch(() => {});
    },
    gosearch(options) {
      this.activeid = "";
      this.$router
        .push({
          path: "/" + options,
        })
        .catch(() => {});
    },
    gologin(options) {
      this.activeid = options;
      this.$router
        .push({
          path: "/" + options,
        })
        .catch(() => {});
    },
    goregister(options) {
      this.activeid = options;
      this.$router
        .push({
          path: "/" + options,
        })
        .catch(() => {});
    },
    select() {
      (this.singer = []), (this.music = []);
      if (this.text != "") {
        this.$axios
          .get("api/singer/selectName?name=" + this.text)
          .then((res) => {
            this.singer = res.data.data.slice(0, 3);
          });
        this.$axios.get("api/song/name?name=" + this.text).then((res) => {
          this.music = res.data.data.slice(0, 3);
        });
      }
    },
    gosingerpage(options) {
      (this.singer = []), (this.music = []);
      if (this.$route.path == "/singerDetail") {
        this.$router.push({
          query: merge(this.$route.query, { id: options.id }),
        });
        this.$router.go(0);
      } else {
        this.$router.push({
          path: "/singerDetail",
          query: {
            id: options.id,
          },
        });
      }
    },
    gomusic(options) {
      (this.music = []), (this.singer = []);
      if (this.$route.path == "/song") {
        this.$router.push({
          query: merge(this.$route.query, { id: options.id }),
        });
        this.$router.go(0);
      } else {
        this.$router.push({
          path: "/song",
          query: {
            id: options.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 60px;
  margin: auto;
  text-align: left;
  box-shadow: 5px 10px 10px -5px #888888;
  ul {
    width: 1200px;
    height: 100%;
    margin: auto;
    li {
      width: 100px;
      height: 60px;
      list-style: none;
      float: left;
      line-height: 60px;
      text-align: center;
      font-size: 15px;
      font-weight: 600;
    }
    li:nth-of-type(6) {
      width: 400px;
      text-align: left;
      line-height: 60px;
      position: relative;
      input {
        width: 300px;
        height: 40px;
        border: none;
        background: #eaeef1;
        border-radius: 5px 0px 0px 5px;
        outline: none;
        padding-left: 20px;
        box-sizing: border-box;
      }
      .search {
        width: 300px;
        height: auto;
        background: #eaeef1;
        margin-top: -10px;
        border-radius: 0px 0px 10px 10px;
        position: absolute;
        z-index: 100000;
        p {
          width: 100%;
          height: 50px;
          span {
            display: inline-block;
            line-height: 40px;
          }
          span:nth-of-type(1) {
            width: 70%;
            text-align: center;
            font-size: 16px;
          }
        }
        p:hover {
          background: #95ccf4;
          span {
            color: #fff;
          }
        }
      }
    }
  }
}

.active {
  color: #95ccf4;
  border-bottom: 2px solid #95ccf4;
}
</style>
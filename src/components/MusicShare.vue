<script setup>
  import { onMounted, ref } from "vue"
  import * as config from "../../config.js";
  import TextInput from "@/components/TextInput.vue";
  import LoadingAnimation from "@/components/LoadingAnimation.vue";

  const artist = ref("")
  const accessToken = ref("")
  const song = ref("")
  const songQuery = ref()
  const loading = ref(false)


  async function getAccessToken() {
    const clientId = "7f9a7c7dbfa84d85afc7057b703579cc";
    const clientSecret = "4e5a75d8380b4280ab33767896e18953";

    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    data.append("scope", "user-read-private user-read-email streaming"); // Add 'streaming' scope

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    })

    const responseData = await response.json();
    accessToken.value = responseData.access_token;
  }

  async function getAutherDetails(authorId){
    const url = `https://api.spotify.com/v1/artists/${authorId}`
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
      },
    })

    const responseData = await response.json()
  }

  async function getSong(songName) {
    if (songName.length > 0){
      loading.value = true
      const baseUrl = "https://api.spotify.com/v1/search";
      const params = new URLSearchParams({
        q: songName,
        type: "track",
        limit: "10",
      })

      const url = `${baseUrl}?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      })

      const responseData = await response.json();
      // console.log(responseData)
      // console.log(responseData.tracks.items)
      // for (const item of responseData.tracks.items){
      //   console.log(item.artists[0].name)
      // }

      songQuery.value = responseData.tracks.items
      loading.value = false
    }
  }

  async function searchSong(){
    await getSong(song.value)
    song.value = ""
  }

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = accessToken.value
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => {
        cb(token);
      },
      volume: 0.5
    })

      // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    player.connect(); // Connect the player to the SDK
    console.log("Spotify SDK Connected")
  }

  onMounted(async () => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    await getAccessToken()
  })
</script>

<template>
  <div class="middle-column">
    <div class="search-area">
      <TextInput class="input-area" rows="1" v-model="song" placeholder="Never gonna give you up" :styles="{'margin': '0'}" />
      <button @click="searchSong" >Search</button>
    </div>
    <LoadingAnimation v-if="loading" />
    <div v-else class="content-wrapper" v-for="item in songQuery" >
      <img :src="item.album.images[0].url" alt="album image" class="song-image" />
      <div class="song-details">
        <p class="author-name">{{ item.name }}</p>
        <p class="song-name">{{ item.artists[0].name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.song-image{
  margin-right: 1rem;
  height: 6rem;
  border: 1px white solid;
  border-radius: 7px;
}

.input-area{
  flex: 1;
}

.search-area {
  display: flex;
  margin: 0 0 0.5rem 0;
  gap: 0.5rem;
}

.author-name {
  color: lightgreen;
  margin: 0;
}

.song-name {
  margin: 0;
}

.song-details{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
}

.content-wrapper {
  margin-bottom: 15px;
  width: 100%;
  border: 2px white solid;
  border-radius: 10px;
  display: flex;
  padding: 0.6rem 0.6rem 0.6rem 0.6rem;
}
</style>

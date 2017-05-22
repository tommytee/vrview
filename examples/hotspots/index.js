/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
  dolphins: {
    image: 'dolphins.jpg',
    preview: 'dolphins-preview.jpg',
    hotspots: {
      whaleRight: {
        pitch: 0,
        yaw: 110,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-01.png'
      },
      whaleLeft: {
        pitch: 0,
        yaw: 150,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-02.png'
      },
      walrus: {
        pitch: 0,
        yaw: 170,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-03.png'
      }
    }
  },
  whaleLeft: {
    image: 'whale-left.jpg',
    preview: 'whale-left-preview.jpg',
    hotspots: {
      whaleRight: {
        pitch: 0,
        yaw: 125,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-01.png'
      },
      dolphins: {
        pitch: 0,
        yaw: 110,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-02.png'
      },
      walrus: {
        pitch: 0,
        yaw: 30,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-03.png'
      }
    }
  },
  whaleRight: {
    image: 'whale-right.jpg',
    preview: 'whale-right-preview.jpg',
    hotspots: {
      dolphins: {
        pitch: 0,
        yaw: 305,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-01.png'
      },
      whaleLeft: {
        pitch: 0,
        yaw: 180,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-02.png'
      },
      walrus: {
        pitch: 0,
        yaw: 210,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-03.png'
      }
    }
  },
  walrus: {
    image: 'walrus.jpg',
    preview: 'walrus-preview.jpg',
    hotspots: {
      whaleLeft: {
        pitch: 0,
        yaw: 20,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-01.png'
      },
      whaleRight: {
        pitch: 0,
        yaw: 340,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-02.png'
      },
      dolphins: {
        pitch: 0,
        yaw: 320,
        radius: 0.08,
        distance: 1,
        src: 'dolphin-icon-03.png'
      }
    }
  }
};

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    image: 'blank.png',
    preview: 'blank.png',
    is_stereo: true,
    is_autopan_off: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('click', onHotspotClick);
  vrView.on('error', onVRViewError);
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  loadScene('walrus');
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onHotspotClick(e) {
  console.log('onHotspotClick', e.id);
  if (e.id) {
    loadScene(e.id);
  }
}

function loadScene(id) {
  console.log('loadScene', id);
  console.log( scenes[id].image );

  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_stereo: true,
    is_autopan_off: true
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance,
      src: hotspot.src
    });
  }
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);

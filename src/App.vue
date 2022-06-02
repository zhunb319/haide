<template>
  <v-app>
    <core-app-bar />
    <div style="margin-top: 100px;">
<!--      <v-row>-->
<!--        <v-col cols="3"></v-col>-->
<!--        <v-col cols="6">-->
<!--          <v-btn elevation="2" @click="zoomHandle('out')">放大</v-btn>-->
<!--          <v-btn elevation="2" @click="zoomHandle('in')">缩小</v-btn>-->
<!--        </v-col>-->
<!--      </v-row>-->
      <v-row>
        <v-col cols="12">
          <div class="svg-container d-flex justify-center" id="svgWrapper"></div>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      ref="detail-dialog"
      v-model="dialog"
      :hide-overlay="true"
      :persistent="true"
      content-class="dialogClass"
      click:outside="dialogClose"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Detail Info
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              sm="12"
            >
              <v-data-table
              :headers="headers"
              :items="desserts"
              class="elevation-1"
              :hide-default-footer="true"
              ></v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  // let componentSvg = require("@/data/EFI200/EFI-200-001-00.svg")
  import { fetchSvg } from '@/api/svg.js'
  import $ from 'jquery'
  import Draggabilly from 'draggabilly'
  import vivus from 'vivus'
  export default {
    name: 'App',
    data(){
      return {
        // componentSvg,
        imgWidth: 600,
        svgObj: null,
        size: 1,
        dialog: false,
        headers: [
          {text: 'CODE',value: 'code'},
          { text: 'PART NO', value: 'partNo' },
          { text: 'DESCRIPTION（CN）', value: 'descriptionCn' },
          { text: 'DESCRIPTION（EN）', value: 'descriptionEn' },
          { text: 'QTY', value: 'qty' },
          { text: 'UNIT PRICE', value: 'unitPrice' },
          { text: 'QTY IN PACK', value: 'qtyInPack' },
          { text: 'YAMAHA PART NO.', value: 'yamaha' },
        ],
        desserts: [
          {
            code: '0107040',
            partNo: '9 F2.5-01.06.00.11',
            descriptionCn: '减磨片',
            descriptionEn: 'Antifriction gasket',
            qty: 1,
            unitPrice: '$2.05',
            qtyInPack: '(1pc/bag)',
            yamaha: '69M-15739-00-00',
          }
        ]
      }
    },
    components: {
      CoreAppBar: () => import('@/components/core/AppBar'),
    },
    mounted(){
      const self = this
      new Promise(resolve => {
        fetchSvg().then(res => {
          console.log("*****");
          $("#svgWrapper").html(res)
          resolve()
        })
      }).then(()=>{
        const draggie = new Draggabilly( 'svg', {
          containment:'#svgWrapper'
        });
        const gTexts = document.querySelectorAll("g[id^='TEXT']")
        gTexts.forEach(function(textNode){
          $(textNode).on('click', function(event){
            self.textNodeClick($(this), {
              posX: event.pageX,
              posY: event.pageY,
              scale: 1,
            })

          })
        })
      })
    },
    methods: {
      textNodeClick($target, params) {
        const {posX, posY, scale } = params
        this.removeAllPath()
        this.drawPath($target, params)
        this.showDialog(posX, posY)
      },
      removeAllPath(){
        $('#svgWrapper').find('g path').remove()
      },
      drawPath($target, params){
        const {posX, posY, scale } = params
        const $textNode = $target.find('text')[0]
        const {a, b, c, d, e, f} = $textNode.transform.animVal[0].matrix
        const html = $target.html()
        const path = `<path id="posizione_cerchio_0" data-circle="si" fill-opacity="0.0" stroke="#f00" stroke-width="2" stroke-miterlimit="10" transform="matrix(${a} ${b} ${c} ${d} ${e} ${f}) translate(-27,-32) scale(1, 1)" d="M31.818,15.261 c-9.126,0.541-12.948,6.715-13.156,9.744 c-0.208,3.03,1.968,12.412,11.806,12.235c9.837-0.177,14.093-4.971,14.185-9.159c0.091-4.188-3.446-14.842-13.268-14.2  c-9.822,0.641-10.831,7.496-11.015,8.897" style="stroke-dasharray: 93, 95; stroke-dashoffset: 0;" ></path>`
        $target.html(html + path)
      },
      showDialog(posX, posY){
        this.dialog = true
        this.$nextTick(()=>{
          const $dialogDom = $('.dialogClass')
          $dialogDom[0].style.left = `${posX-400}px`
          $dialogDom[0].style.top = `${posY+10}px`
        })
      },
      dialogClose(){
        this.dialog = false
        $('#svgWrapper').find('g path').remove()
      },
      zoomHandle(type) {
        const step = 0.2
        if(!this.svgObj) {
          this.svgObj = $('svg')[0]
        }
        debugger
        const targetSvg = this.svgObj? this.svgObj: $('svg')[0]
        let newSize = this.size
        if(type=='out') {
          newSize = this.size + step
        }else if(type=='in' && this.size > 0.5) {
          newSize = this.size - step
        }
        this.size = newSize
        targetSvg.style.transform = `scale(${newSize})`
      }
    }
  }
</script>

<style lang="scss">
.svg-container{
  width: 100%;
  overflow:scroll;
}
.svg-container text:hover{
  fill: red;
  font-weight: 500;
  transform: scalce(1.2);
  cursor: pointer;
}
.dialogClass{
  position: absolute;
  width: 820px;
  .v-text-field{
    //margin-top: 0;
    padding-top: 0;
  }
}
</style>

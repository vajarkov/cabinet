<template>
    <div class="card mx-0 py-0 px-0 my-0">
      <div class="card-header d-flex">
        
          <label for="Omega" style="align:center;" class="form-label mx-2 my-0">Лицевые счета</label>
          <input id="omega" class="form-control form-control-sm" style="background:#276595;align:center; height:30px;width:27%" type="file" @change="onChangeOmega"/>
          <xlsx-read :file="fileOmega">
            <xlsx-json @parsed="onParsedOmega">
        
            </xlsx-json>
          </xlsx-read>
        
    
     
          <label for="VD" style="align:center;" class="form-label mx-2 my-0">Абоненты</label>
          <input id="VD" class="form-control form-control-sm" style="background:#276595;align:center; height:30px;width:27%" type="file" @change="onChangeVD"/>
          <xlsx-read :file="fileVD">
            <xlsx-json @parsed="onParsedVD">
        
            </xlsx-json>
          </xlsx-read>
        <button class="mx-5 text-light" style="background:#276595;align:center;position: absolute; right: 0;height:30px;width:20%" @click="exportExcel()" :disabled="Object.keys(collectionOmega).length===0&&Object.keys(collectionVD).length===0" >Excel</button>
        
      </div> 
  </div>
    
</template>

<script>
import { XlsxRead, XlsxJson } from "../../../node_modules/vue3-xlsx/dist/vue3-xlsx.cjs.prod.js";
import { saveExcel } from '@progress/kendo-vue-excel-export';
export default {
    name: "Omega",
    components: {
        XlsxRead,
        XlsxJson,
        
    },

    data() {
    return {
      fileOmega: null,
      fileVD: null,
      collectionOmega: [],
      collectionVD: [],
      
    };
  },

  
  methods: {

    ExcelDateToJSDate(serial) {
      var utc_days  = Math.floor(serial - 25569);
      var utc_value = utc_days * 86400;                                        
      var date_info = new Date(utc_value * 1000);

      var fractional_day = serial - Math.floor(serial) + 0.0000001;

      var total_seconds = Math.floor(86400 * fractional_day);

      var seconds = total_seconds % 60;

      total_seconds -= seconds;

      var hours = Math.floor(total_seconds / (60 * 60));
      var minutes = Math.floor(total_seconds / 60) % 60;

      return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    },
    onChangeOmega(event) {
        
        this.fileOmega = event.target.files ? event.target.files[0] : null;

    },
    onChangeVD(event) {
        
        this.fileVD = event.target.files ? event.target.files[0] : null;
      
    },
    onParsedOmega(event) {
        
        this.collectionOmega = event ? event :null;
    },
    onParsedVD(event) {
        
        this.collectionVD = event ? event :null;
    },
    
    exportExcel () {
      let index = 0;
      let result = [];
      this.collectionVD.forEach(vd => {
        let docnum = vd['Дог'] + ""
        while(docnum.length < 3) docnum = "0" + docnum
        let datedoc = this.ExcelDateToJSDate(vd['Дата дог']).toLocaleString().slice(0,10)
        let item = { N: index, pa: "", type: vd['Мкр'], address: vd['Название'], house: vd['Дом'], flat: vd['Кв'], rent: vd['Абон'], docnum: docnum, datedoc: datedoc };
        this.collectionOmega.forEach(omega => {
          
          if(vd['Мкр'].toString().toLowerCase() === omega['Тип адреса'].toString().toLowerCase()){
            
            if(vd['Название'].toString().toLowerCase() === omega['Адрес'].toString().toLowerCase()){
              
              if(vd['Дом'].toString().toLowerCase() === omega['Дом'].toString().toLowerCase().replace(/['"]+/g, '')){
                
                if(vd['Кв'].toString() === omega['Кв'].toString()){
                  index++
                  
                  
                  item.pa = omega['ЛС']
                  //let item = { N: index, pa: omega['ЛС'], type: omega['Тип адреса'], address: omega['Адрес'], house: vd['Дом'], flat: vd['Кв'], rent: vd['Абон'], docnum: docnum, datedoc: datedoc };

                  //result.push(item);
                  //return;
                }
              }
            }
          }
        })
        result.push(item); 
      })
      
      
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      saveExcel({
                    data: result,
                    fileName: "Абоненты_"+ today.toISOString().slice(0,10),
                    columns: [
                        { field: 'N', title: "№"},
                        { field: 'pa', title: 'ЛС' },
                        { field: 'type', title:'Тип адреса' },
                        { field: 'address', title:'Адрес' },
                        { field: 'house', title:'Дом' },
                        { field: 'flat', title:'Квартира' },
                        { field: 'rent', title: 'Оплата' },
                        { field: 'docnum', title: '№ договора' },
                        { field: 'datedoc', title: 'Дата договора' },
                       
                    ]
                });
      
    },
    
  }
}
</script>

<style scoped>

</style>
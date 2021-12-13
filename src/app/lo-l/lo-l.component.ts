declare var require: any;
import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MasteriesService} from "../services/masteries.service";
import champions from "../../data/champions.json";
import * as _ from "lodash"
import {toNumber} from "lodash"

@Component({
  selector: 'app-lo-l',
  templateUrl: './lo-l.component.html',
  styleUrls: ['./lo-l.component.scss']
})
export class LoLComponent {
  selected: number = 4;
  id: string = '';
  champ: string = 'Default';
  mastery: string = '*';
  content: Array<any> = [];
  finalData: Array<any> = [];
  champData: Array<any> = [];

  finalData_Supp: Array<any> = [];
  finalData_Adc: Array<any> = [];
  finalData_Mid: Array<any> = [];
  finalData_Jgl: Array<any> = [];
  finalData_Top: Array<any> = [];

  constructor(private breakpointObserver: BreakpointObserver, private masteriesServices: MasteriesService) {
  }

  rand(maxLimit = 100) {
    return Math.floor(Math.random() * maxLimit);
  }

  reset() {
    this.content = []
    this.finalData = []
    this.champData = []
    this.finalData_Supp = []
    this.finalData_Adc = []
    this.finalData_Mid = []
    this.finalData_Jgl = []
    this.finalData_Top = []
  }

  SetData(choice: string) {
    this.masteriesServices.getMasteries().subscribe(
      elem => {
        this.reset();
        this.Champs();
        this.content = elem;
        for (const elemKey in elem) {
          let find = _.find(this.champData, (data) => {
            return data.key == elem[elemKey]["championId"]
          });
          find.masteries = elem[elemKey]["championLevel"];
          let find_Supp = _.find(this.champData, (data) => {
            return data.key == elem[elemKey]["championId"] && elem[elemKey]['championLevel'] <= this.selected && _.find(data.role, (role) => {
              return role == "supp"
            });
          })
          let find_Adc = _.find(this.champData, (data) => {
            return data.key == elem[elemKey]["championId"] && elem[elemKey]['championLevel'] <= this.selected && _.find(data.role, (role) => {
              return role == "adc"
            });
          })
          let find_Mid = _.find(this.champData, (data) => {
            return data.key == elem[elemKey]["championId"] && elem[elemKey]['championLevel'] <= this.selected && _.find(data.role, (role) => {
              return role == "mid"
            });
          })
          let find_Jgl = _.find(this.champData, (data) => {
            return data.key == elem[elemKey]["championId"] && elem[elemKey]['championLevel'] <= this.selected && _.find(data.role, (role) => {
              return role == "jgl"
            });
          })
          let find_Top = _.find(this.champData, (data) => {
            return data.key == elem[elemKey]["championId"] && elem[elemKey]['championLevel'] <= this.selected && _.find(data.role, (role) => {
              return role == "top"
            });
          })
          this.finalData.push(find);
          if (find_Supp != undefined) {
            this.finalData_Supp.push(find_Supp);
          }
          if (find_Adc != undefined) {
            this.finalData_Adc.push(find_Adc);
          }
          if (find_Mid != undefined) {
            this.finalData_Mid.push(find_Mid);
          }
          if (find_Jgl != undefined) {
            this.finalData_Jgl.push(find_Jgl);
          }
          if (find_Top != undefined) {
            this.finalData_Top.push(find_Top);
          }
        }
        switch (choice) {
          case "adc":
            this.Adc();
            break;
          case "supp":
            this.Supp();
            break;
          case "mid":
            this.Mid();
            break;
          case "jgl":
            this.Jgl();
            break;
          case "top":
            this.Top();
            break;
        }
      }
    )
  }

  Champs() {
    let array = [];
    let data = champions[0];
    for (const datum in data) {
      array.push({
        "id": data[datum]["id"],
        "key": data[datum]["key"],
        "name": data[datum]["name"],
        "role": data[datum]["role"]
      })
    }
    this.champData = array;
  }

  Adc() {
    let random = this.rand(this.finalData_Adc.length);
    this.id = this.finalData_Adc[random]["id"];
    this.champ = this.finalData_Adc[random]["name"];
    this.mastery = this.finalData_Adc[random]["masteries"];
    this.changeBackGround();
  }

  Supp() {
    let random = this.rand(this.finalData_Supp.length);
    this.id = this.finalData_Supp[random]["id"];
    this.champ = this.finalData_Supp[random]["name"];
    this.mastery = this.finalData_Supp[random]["masteries"];
    this.changeBackGround();
  }

  Mid() {
    let random = this.rand(this.finalData_Mid.length);
    this.id = this.finalData_Mid[random]["id"];
    this.champ = this.finalData_Mid[random]["name"];
    this.mastery = this.finalData_Mid[random]["masteries"];
    this.changeBackGround();
  }

  Jgl() {
    let random = this.rand(this.finalData_Jgl.length);
    this.id = this.finalData_Jgl[random]["id"];
    this.champ = this.finalData_Jgl[random]["name"];
    this.mastery = this.finalData_Jgl[random]["masteries"];
    this.changeBackGround();
  }

  Top() {
    let random = this.rand(this.finalData_Top.length);
    this.id = this.finalData_Top[random]["id"];
    this.champ = this.finalData_Top[random]["name"];
    this.mastery = this.finalData_Top[random]["masteries"];
    this.changeBackGround();
  }

  onSelected(value: number | null) {
    this.selected = toNumber(value);
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  changeBackGround() {
    let body = document.getElementById("body");
    if (body) {
      body.style.backgroundImage = "url('assets/champs/" + (this.capitalizeFirstLetter(this.id)) + ".jpg')";
    }
  }
}

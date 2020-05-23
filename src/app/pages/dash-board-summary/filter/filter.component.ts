import { Component, OnInit, Input, Renderer2, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { LayoutService } from "../../../shared/services/layout.service";
import PerfectScrollbar from "perfect-scrollbar";
import { CustomizerService } from "app/shared/services/customizer.service";
import { ThemeService, ITheme } from "app/shared/services/theme.service";
import { CommonService } from '../../../shared/services/MyServices/common.service';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { takeUntil } from "rxjs/operators";
import { Subject, ReplaySubject, Observable } from "rxjs";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FilterComponent implements OnInit {
  myControl = new FormControl();
  myControl1 = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  public itemForm: FormGroup;
  isCustomizerOpen: boolean = false;
  viewMode: 'options' | 'json' = 'options';
  DistributorData = []
  Division = [];
  filterValue: any;
  filterValue1: any;
  filterValue2: any;
  filterValue3: any;
  private banks = [
    { name: 'Bank A (Switzerland)', id: 'A' },
    { name: 'Bank B (Switzerland)', id: 'B' },
    { name: 'Bank C (France)', id: 'C' },
    { name: 'Bank D (France)', id: 'D' },
    { name: 'Bank E (France)', id: 'E' },
    { name: 'Bank F (Italy)', id: 'F' },
    { name: 'Bank G (Italy)', id: 'G' },
    { name: 'Bank H (Italy)', id: 'H' },
    { name: 'Bank I (Italy)', id: 'I' },
    { name: 'Bank J (Italy)', id: 'J' },
    { name: 'Bank K (Italy)', id: 'K' },
    { name: 'Bank L (Germany)', id: 'L' },
    { name: 'Bank M (Germany)', id: 'M' },
    { name: 'Bank N (Germany)', id: 'N' },
    { name: 'Bank O (Germany)', id: 'O' },
    { name: 'Bank P (Germany)', id: 'P' },
    { name: 'Bank Q (Germany)', id: 'Q' },
    { name: 'Bank R (Germany)', id: 'R' }
  ]
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
  sidenavTypes = [
    {
      name: "Default Menu",
      value: "default-menu"
    },
    {
      name: "Separator Menu",
      value: "separator-menu"
    },
    {
      name: "Icon Menu",
      value: "icon-menu"
    }
  ];
  sidebarColors: any[];
  topbarColors: any[];
  RoleType: any[];


  RoleName: any;
  DistCode: any;
  isDistDrpDownVisible: boolean;

  Position: any[];
  layoutConf;
  selectedMenu: string = "icon-menu";
  selectedLayout: string;
  isTopbarFixed = false;
  isFooterFixed = false;
  isRTL = false;
  egretThemes: ITheme[];
  perfectScrollbarEnabled: boolean = true;
  public bankFilterCtrl: FormControl = new FormControl();





  constructor(
    private CommonService: CommonService,
    private navService: NavigationService,
    public layout: LayoutService,
    private themeService: ThemeService,
    public customizer: CustomizerService,
    private renderer: Renderer2,
    private fb: FormBuilder,
  ) { }
  @Input() placeholderLabel = 'Suche111';
  @Output() messageEvent = new EventEmitter<string>();
  private _onDestroy = new Subject<void>();


  ngOnInit() {
    this.filterValue = null;
    this.myControl.valueChanges.subscribe(value => {
      //console.log(value);
      //   alert('hi');
      this._filter(value)
    });


    this.myControl1.valueChanges.subscribe(value => {
      //console.log(value);
      //   alert('hi');
      this._filter1(value)
    });


    this.isDistDrpDownVisible = true;


    this.RoleName = this.CommonService.getRole();
    this.DistCode = this.CommonService.GetDistributorCode()
    // alert(this.DistCode);



    if (this.RoleName != "TML") {
      this.isDistDrpDownVisible = false;
      const data: InputData1 = {} as InputData1;

      // data.distributor_id = Event.distributor_id;
      data.distributor_id = this.DistCode;
      data.div_search_text = "";

      this.Getdivision(data);
    }


    debugger;
    const data: InputData = {} as InputData;

    data.size = 10;
    data.org_search_text = "";

    this.GetDistributor(data);



    // this.bankFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     debugger;
    //     //  alert(this.bankFilterCtrl.value);

    //     this.filterBanks();
    //   });

    this.layoutConf = this.layout.layoutConf;
    this.selectedLayout = this.layoutConf.navigationPos;
    this.isTopbarFixed = this.layoutConf.topbarFixed;
    this.isRTL = this.layoutConf.dir === "rtl";
    this.egretThemes = this.themeService.egretThemes;





    this.itemForm = this.fb.group({

      month: [],
      year: [],

      div_id: [],
      invoice_status: [],
      distributor_id: []



      // //  "order_status":"",
      // bankCtrl: []


    })


    //     this.itemForm.get('distributor_id').valueChanges.subscribe(value => {
    //       console.log(value);
    //       alert('hi');
    //       this._filter(value)
    // });



  }

  filterMyOptions1(Event) {

    //alert(Event);
    this.filterValue2 = Event;

  }

  private _filter(value: string): string[] {
    this.filterValue1 = value;
    // this.filterValue = filterValue1;
    // alert(filterValue);
    if (this.filterValue1 == "") {
      this.filterValue = null;
    }

    const data: InputData = {} as InputData;

    data.size = 10;
    data.org_search_text = this.filterValue1;

    this.GetDistributor(data);
    // alert(filterValue1);

    return this.options.filter(option => option.toLowerCase().includes(this.filterValue1));
  }
  private _filter1(value: string): string[] {

    this.filterValue3 = value;

    if (this.filterValue3 == "") {
      this.filterValue2 = null;
    }


    return this.options.filter(option => option.toLowerCase().includes(this.filterValue3));
  }



  filterMyOptions(Event) {
    this.myControl1.setValue('');
    // alert(Event);
    // console.log(Event);
    this.filterValue = Event;

    const data: InputData1 = {} as InputData1;

    // data.distributor_id = Event.distributor_id;
    data.distributor_id = Event;
    data.div_search_text = "";

    this.Getdivision(data);
  }
  Getdivision(Data1) {
    debugger
    this.CommonService.DivisionList(Data1).subscribe(

      data => {
        debugger


        if (data.success == true) {

          //     this.dataPreparation(data.data);

          this.Division = [];
          this.filterValue2 = null;
          //  console.log(data);
          this.Division = data.data.result;

        //  console.log(this.Division);
        }
        else {

          //this.loader.close();
          //
        }
      }, (err) => {
        // this.loader.close();
      }

    );


  }



  GetDistributor(Data) {




    debugger
    this.CommonService.DistributorList(Data).subscribe(

      data => {
        debugger


        if (data.success == true) {

          //     this.dataPreparation(data.data);


          //  console.log(data);
          this.DistributorData = data.data.result;
          this.filteredOptions = data.data.result

          // console.log(this.DistributorData);
        }
        else {

          //this.loader.close();
          //
        }
      }, (err) => {
        // this.loader.close();
      }

    );


  }


  // private filterBanks() {
  //   if (!this.banks) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.bankFilterCtrl.value;
  //   if (!search) {
  //     this.filteredBanks.next(this.banks.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //     const data: InputData = {} as InputData;

  //     data.size = 10;
  //     data.org_search_text = this.bankFilterCtrl.value;

  //     this.GetDistributor(data);
  //   }
  //   // filter the banks
  //   this.filteredBanks.next(
  //     this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)

  //   );
  // }


  reset() {
    this.itemForm.reset();
    this.myControl.reset();
    this.myControl1.reset();
    this.messageEvent.emit(this.itemForm.value)
    this.filterValue = null;
    this.filterValue2 = null;
    this.isCustomizerOpen = false;
  }





  Search() {
    debugger;

    // alert(this.itemForm.value.year);
    //alert(this.itemForm.value.month);


    // if (this.itemForm.value.year == null && this.itemForm.value.month == null) {

    // }
    // else {

      if (this.itemForm.value.year != null && this.itemForm.value.month == null) {
        Swal.fire('Please Select Month');
        // alert('select yaer');
      }
      else if (this.itemForm.value.year == null && this.itemForm.value.month != null) {
        Swal.fire('Please Select Year');
        //alert('select Month');
      }
      else if (this.itemForm.value.year == null && this.itemForm.value.month == null) {
        Swal.fire('Please Select Year/Month');
        //alert('select Month');
      }
      else {
        this.itemForm.get('distributor_id').setValue(this.filterValue);
        this.itemForm.get('div_id').setValue(this.filterValue2);
        this.messageEvent.emit(this.itemForm.value)
        this.isCustomizerOpen = false;
      }


  //  }




  }





}



interface Bank {
  id: string;
  name: string;
}

export class InputData {

  size: number
  org_search_text: string


}

export class InputData1 {
  distributor_id: string
  div_search_text: string
  // size: number
  // org_search_text: string


}


export class OutPutValue {
  month: string
  year: string

  div_id: string
  invoice_status: string
  distributor_id: string

}





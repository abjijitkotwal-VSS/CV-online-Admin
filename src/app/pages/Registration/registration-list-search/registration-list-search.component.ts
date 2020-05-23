import { Component, OnInit, Input, Renderer2, EventEmitter, Output } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { LayoutService } from "../../../shared/services/layout.service";
import PerfectScrollbar from "perfect-scrollbar";
import { CustomizerService } from "app/shared/services/customizer.service";
import { ThemeService, ITheme } from "app/shared/services/theme.service";
import { CommonService } from '../../../shared/services/MyServices/common.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-registration-list-search',
  templateUrl: './registration-list-search.component.html',
  styleUrls: ['./registration-list-search.component.scss']
})
export class RegistrationListSearchComponent implements OnInit {
  public itemForm: FormGroup;
  isCustomizerOpen: boolean = false;
  viewMode: 'options' | 'json' = 'options';
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

  Position: any[];
  layoutConf;
  selectedMenu: string = "icon-menu";
  selectedLayout: string;
  isTopbarFixed = false;
  isFooterFixed = false;
  isRTL = false;
  egretThemes: ITheme[];
  perfectScrollbarEnabled: boolean = true;






  constructor(
    private CommonService: CommonService,
    private navService: NavigationService,
    public layout: LayoutService,
    private themeService: ThemeService,
    public customizer: CustomizerService,
    private renderer: Renderer2,
    private fb: FormBuilder,
  ) { }
  @Output() messageEvent = new EventEmitter<string>();

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.selectedLayout = this.layoutConf.navigationPos;
    this.isTopbarFixed = this.layoutConf.topbarFixed;
    this.isRTL = this.layoutConf.dir === "rtl";
    this.egretThemes = this.themeService.egretThemes;

    this.GetRole();



    this.itemForm = this.fb.group({

      account_type: [''],
      status: [''],
      user_name: [''],
      contact_no: [''],
      email_id: [''],
      first_name: [''],
      last_name: [''],
      distributor_code: [''],
      position: [''],
      position_id:[''],
      role_id:[''],


    })



  }

  OnselectedRole(value) {
   

  
    this.GetPosition(value);




  }
  reset()
  {
    this.itemForm.reset();
  }
  GetPosition(id) {

    debugger;

    var Json = {
      "role_id": id
    }


    this.CommonService.BindPosition(Json).subscribe(

      data => {

        if (data.success == true) {
         
          this.Position = data.data;
         console.log(this.Position);
        }


        else {
          
        }
      }, (err) => {
        
      }

    );




  }

  
  Search() {
    //this.router.navigate(['pages/OrdersList']);
    // this.router.navigate(["OrdersList"]);
    //this.router.navigateByUrl('/OrdersList');
    //alert('1');


    debugger

    console.log(this.itemForm.value);

    //this.dataPass.setOrderFilterData(this.itemForm.value);


  

  
    this.messageEvent.emit(this.itemForm.value)
   this.isCustomizerOpen = false;
  }


  GetRole() {

   
    this.CommonService.BindRoleType('').subscribe(

      data => {

        if (data.success == true) {

          this.RoleType = data.data;

         console.log(this.RoleType);
        }


        else {

        }
      }, (err) => {

      }

    );




  }


}

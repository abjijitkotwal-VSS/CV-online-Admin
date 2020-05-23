import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input
} from "@angular/core";
import { egretAnimations } from "app/shared/animations/egret-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from 'tinycolor2';
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { ChartDataSets, ChartType, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";
import { CommonService } from '../../shared/services/MyServices/common.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-dash-board-summary',
  templateUrl: './dash-board-summary.component.html',
  styleUrls: ['./dash-board-summary.component.scss'],
  animations: egretAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class DashBoardSummaryComponent implements OnInit {


  Monthlydata: any;

  selectedYears: any[];
  years: any[];
  currency: string = '₹';
  Percentage: string = '%';
  FilterString: any;
  TotalCount: any;
  TotalCount1: any;
  PendingCount: any;
  InvoiceCount: any;
  OutForDeliveryCount: any;
  DeliveredCount: any;
  Cancelled: any;
  YotalValue: any;
  TotalValue: any;
  barchartString : any ;
SummaryStraing : any;

  PendingValue: any;
  Invoicedvalue: any;
  OutForDeliveryValue: any;
  DeleiveryValue: any;
  CancelValue: any;



  Agingdata = [];
  a = []
  b = []
  c = []
  FromDate: any;
  ToDate: any;

  barChartOptions: ChartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    scales: { //you're missing this
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'No. of Orders'
        }, ticks: {
          beginAtZero: true,
          // max : 5,
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }]
    }

  };
  barChartLabels: Label[] = [] //['Jan', 'Feb', 'March', 'April'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0,0], label: 'Pending' },
    { data: [0, 0, 0,0], label: 'Invoiced' },
    { data: [0, 0, 0,0], label: 'Out For Delivery' },
    { data: [0, 0, 0,0], label: 'Delivered' },
    { data: [0, 0, 0,0], label: 'Cancelled' },

  ];
  colors = [
    {
      //pending // 1st Year.
      backgroundColor: ["#ff3300", "#ff3300", "#ff3300", "#ff3300", "#ff3300"]
    },
    { // Invoiced.
      backgroundColor: ["#00bfff", "#00bfff", "#00bfff", "#00bfff", "#00bfff"]
    },
    { // OutForDelivery.
      backgroundColor: ["#FF7F00", "#FF7F00", "#FF7F00", "#FF7F00", "#FF7F00"]
    },
    { // Delivered.
      backgroundColor: ["#39f200", "#39f200", "#39f200", "#39f200", "#39f200"]
    },

    { // Cancelled
      backgroundColor: ['#999999', '#999999', '#999999', '#999999', '#999999']
    },




    { // Freez.
      backgroundColor: ["#b642f5", "#b642f5", "#b642f5", "#b642f5", "#b642f5"]
    },





  ]



  colors1 = [
    { // 1st Year.
      backgroundColor: ["#39f200", "#39f200", "#39f200", "#39f200", "#39f200", "#39f200"]
    },
    { // 2nd Year.
      backgroundColor: ["#FF7F00", "#FF7F00", "#FF7F00", "#FF7F00", "#FF7F00", "#FF7F00"]
    },

    { // 2nd Year.
      backgroundColor: ["#ff3300", "#ff3300", "#ff3300", "#ff3300", "#ff3300", "#ff3300"]
    }
  ]


  barChartOptions1: ChartOptions = {
    // responsive: true,
    responsive: true,
    //maintainAspectRatio: false,
    scales: { //you're missing this
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'No. of Orders',

        }, ticks: {
          beginAtZero: true,
          // max : 5,
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Status'
        }
      }]
    }

  }; Pending
  // barChartLabels1: Label[] = ['Pending', 'Invoiced', 'Out For Delivery', 'Deliverd',  'Cancelled'];
  barChartLabels1: Label[] = ['Pending', 'Invoiced', 'Out For Delivery', 'Delivered'];
  barChartType1: ChartType = 'bar';
  barChartLegend1 = true;
  barChartPlugins1 = [];

  barChartData1: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: '0-8 Hr' }


  ];




  rows = [];
  rows1 = [];
  rows2 = [];
  rows3 = [];
  selected = [];
  Summarydata = [];

  columns: any[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;




  trafficVsSaleOptions: any;
  trafficVsSale: any;
  trafficData: any;
  saleData: any;

  sessionOptions: any;
  sessions: any;
  sessionsData: any;

  trafficGrowthChart: any;
  bounceRateGrowthChart: any;

  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];
  StatusSumarry = [];
  StatusAgig = [];
  StatusAgig1 = [];
  StatusSumarry1 = [];

  constructor(
    private themeService: ThemeService,
    private CommonService: CommonService,
    private loader: AppLoaderService,
    private datepipe: DatePipe,
  ) {
    // this.fetch((data) => {
    //   this.rows = data;
    // });


  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  selectAll(checkAll, select: NgModel, values) {
    //this.toCheck = !this.toCheck;
    if (checkAll) {
      select.update.emit(values);
    }
    else {
      select.update.emit([]);
    }
  }

  FilterStrings(ListInput) {
    debugger
    //this.FilterString = "<b> Order Status Summary:  </b>";
    this.FilterString ="";


    if (ListInput.month == "" || ListInput.month == undefined || ListInput.month == null) { }
    else {

      var Monthname = " ";
      if (ListInput.month == '1') {        Monthname = 'Jan'      }
      if (ListInput.month == '2') {        Monthname = 'Feb'      }
      if (ListInput.month == '3') {        Monthname = 'March'      }
      if (ListInput.month == '4') {        Monthname = 'Apr'      }
      if (ListInput.month == '5') {        Monthname = 'May'      }
      if (ListInput.month == '6') {        Monthname = 'Jun'      }
      if (ListInput.month == '7') {        Monthname = 'Jul'      }
      if (ListInput.month == '8') {        Monthname = 'Aug'      }
      if (ListInput.month == '9') {        Monthname = 'Sept'      }
      if (ListInput.month == '10') {        Monthname = 'Oct'      }
      if (ListInput.month == '11') {        Monthname = 'Nov'      }
      if (ListInput.month == '12') {        Monthname = 'Dec'      }
     


     // this.FilterString = this.FilterString + Monthname + '  ' + ListInput.year;
      this.SummaryStraing=""
      this.SummaryStraing=Monthname + '  ' + ListInput.year;
    }





    if (ListInput.invoice_status == "" || ListInput.invoice_status == undefined || ListInput.invoice_status == null) { }
    else {
var Status  = "";
if (ListInput.invoice_status == 'invoiced') {        Status = 'Invoiced'      }
if (ListInput.invoice_status == 'out for delivery') {        Status = 'Out For Delivery'      }
if (ListInput.invoice_status == 'delivered') {        Status = 'Delivered'      }

if (ListInput.invoice_status == 'canceled') {        Status = 'Cancelled'      }


      if(this.FilterString =="")
      {
         this.FilterString = this.FilterString + '<b>Status:</b>' + Status;
    }
      else{
        this.FilterString = this.FilterString + '<b>,Status:</b>' + Status;
      }
     
    }

    if (ListInput.distributor_id == "" || ListInput.distributor_id == undefined || ListInput.distributor_id == null) { }
    else {
      
      if(this.FilterString =="")
      {
        this.FilterString = this.FilterString + '<b>Distributor Id:</b>' + ListInput.distributor_id;
    }
      else{
        this.FilterString = this.FilterString + '<b>,Distributor Id:</b>' + ListInput.distributor_id;
      }
    }

    if (ListInput.div_id == "" || ListInput.div_id == undefined || ListInput.div_id == null) { }
    else {
     
      if(this.FilterString =="")
      {
        this.FilterString = this.FilterString + '<b>Division Id:</b>' + ListInput.div_id;
      
    }
      else{
        this.FilterString = this.FilterString + '<b>,Division Id:</b>' + ListInput.div_id;
      
      }
    }


    if (ListInput.from_date == "" || ListInput.from_date == undefined || ListInput.from_date == null) { }
    else {
      //this.FilterString = this.FilterString + '<b>, Monthly Status : </b>' + this.datepipe.transform(ListInput.from_date, 'MMM  y');
    }



    if (ListInput.to_date == "" || ListInput.to_date == undefined || ListInput.to_date == null) { }
    else {
      this.barchartString = "";
      this.barchartString =  this.datepipe.transform(ListInput.from_date, 'MMM  y') + ' <b>- </b>' + this.datepipe.transform(ListInput.to_date, 'MMM  y');
     // this.FilterString = this.FilterString + ' <b>- </b>' + this.datepipe.transform(ListInput.to_date, 'MMM  y');
     // alert(this.datepipe.transform(ListInput.to_date, 'MMM  y'))
      
    }

   

  }




  receiveMessage($event) {


    console.log($event);
    var d = new Date(); // today!
    var x = 120; // go back 5 days!
    d.setDate(d.getDate() - x);

   
    var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);


    this.FromDate = this.datepipe.transform(firstDay, 'yyyy-MM-dd')
    this.ToDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd')


    const ListInput: ListInput = {} as ListInput;

    if ($event.month == null) {
      var Month = new Date().getMonth()+1;
      ListInput.month = Month.toString();
      

    }
    else {
      ListInput.month = $event.month
    }


    if ($event.year == null) {
      var Year = new Date().getFullYear()
      // alert(Year);
      ListInput.year = Year.toString();

    }
    else {
      ListInput.year = $event.year;
    }






    if ($event.invoice_status == null) {
      ListInput.invoice_status = "";

    }
    else {
      ListInput.invoice_status = $event.invoice_status;
    }





    ListInput.from_date = this.FromDate
    ListInput.to_date = this.ToDate





    ListInput.div_id = $event.div_id;
    try {
      ListInput.div_id = $event.div_id;
    }
    catch
    {
      ListInput.div_id = "";
    }



    try {
      ListInput.distributor_id = $event.distributor_id;
    }
    catch
    {
      ListInput.distributor_id = "";
    }


    // ListInput.div_id = $event.div_id.div_id;
    // ListInput.distributor_id = $event.distributor_id.distributor_id;

    this.GetList(ListInput)

    // console.log('DetaildataSucess');
    // console.log($event);

  }



  ngOnInit() {

    var month = new Date().getMonth()+1;
    var Year = new Date().getFullYear();
    // alert(month);

    var d1 = new Date(new Date().getFullYear(), 0, 1);
    // alert(d1);

    var d = new Date(); // today!


    var x = 120; 
    //var x = 180;// go back 5 days!

    var q = d.getDate() - x;

    d.setDate(d.getDate() - x);
    var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
   // alert(firstDay);
    this.FromDate = this.datepipe.transform(firstDay, 'yyyy-MM-dd')
    this.ToDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd')


    const ListInput: ListInput = {} as ListInput;
    ListInput.month = month.toString(),
      ListInput.year = Year.toString();
    ListInput.from_date = this.FromDate
    ListInput.to_date = this.ToDate
    ListInput.div_id = ""
    ListInput.invoice_status = "",
      ListInput.distributor_id = ""
    this.GetList(ListInput)

  }


  GetList(ListInput) {







    this.FilterStrings(ListInput)



    // ListInput.count_from_date = this.Date;
    // ListInput.monthly_statistic_from_date =this.Date;
    // ListInput.tracking_from_date = this.Date;
    this.loader.open();


    debugger
    this.CommonService.Dashboard(ListInput).subscribe(

      data => {
        debugger


        if (data.success == true) {

          this.dataPreparation(data.data);

          this.StatusSumarry = [];
          this.StatusAgig = [];
          this.StatusSumarry = this.StatusSumarry1;
          this.StatusAgig = this.StatusAgig1;
          //    console.log(this.StatusAgig);

          this.a = []
          this.b = []
          this.c = []

          for (let entry1 of this.StatusAgig) {

            //  console.log(entry1.Status);
            this.a.push(entry1.a)
            this.b.push(entry1.b)
            this.c.push(entry1.c)

          }

          //  console.log(this.a);
          ///  console.log(this.b);
          // console.log(this.c);
          this.Agingdata = [];
          const GrsaphRow: AgingGraph = {} as AgingGraph;
          GrsaphRow.data = this.a;
          GrsaphRow.label = "0-8 Hr."
          this.Agingdata.push(GrsaphRow);

          const GrsaphRow1: AgingGraph = {} as AgingGraph;
          GrsaphRow1.data = this.b;
          GrsaphRow1.label = "8-16 Hr."
          this.Agingdata.push(GrsaphRow1);
          const GrsaphRow2: AgingGraph = {} as AgingGraph;
          GrsaphRow2.data = this.c;
          GrsaphRow2.label = "16-24 Hr."
          this.Agingdata.push(GrsaphRow2);
          this.barChartData1 = [];
          this.barChartData1 = this.Agingdata;
          // console.log(this.Agingdata);
          // console.log(this.barChartData1);


          // this.StatusSumarry=this.StatusSumarry1;
          this.loader.close();

        }
        else {

          this.loader.close();
          //
        }
      }, (err) => {
        this.loader.close();
      }

    );


  }

  dataPreparation(Data) {

    var status = []
    var month = []
    var Finalarray = []
    var tempcolor = []
    var FinalColor = []
    var i = Data[0].monthly_status;
    for (var key in i) {
      status.push(key)


    }

   // console.log(Data)
    var test = i["delivered"]
    for (var key in test) {
      month.push(key)


    }
    this.barChartLabels = month
    var temp = []
    var j = 0
    var lable;
    var color1;

    for (var key in i) {

      tempcolor = [];

      if (key == "invoiced") {
        lable = "Invoiced"
        color1 = "#00bfff"
      }
      if (key == "Cancelled") {
        lable = "Cancelled"
        color1 = "#999999"
      }
      if (key == "out_for_delivery") {
        lable = "Out For Delivery"
        color1 = "#FF7F00"
      }
      if (key == "delivered") {
        lable = "Delivered"
        color1 = "#39f200"
      }
      if (key == "freeze") {
        lable = "Freeze"
        color1 = "#b642f5"
      }
      if (key == "pending") {
        lable = "Pending"
        color1 = "#ff3300"
      }
      // const ColorRow: Barchartcolor = {} as Barchartcolor;

      // ColorRow.backgroundColor
      const FianlRow: FinalData = {} as FinalData;
      FianlRow.label = lable// key;
      temp = [];
      if (key != "freeze") {
        for (var key1 in i[key]) {
          //console.log(i[key][key1].count)
          temp.push(i[key][key1].count)
          tempcolor.push(color1);
          debugger
        }
        FianlRow.data = temp;

        const ColorRow: Barchartcolor = {} as Barchartcolor;
        ColorRow.backgroundColor = tempcolor;

        Finalarray.push(FianlRow);
        FinalColor.push(ColorRow);
      }
    }
    //  console.log('status')
    // console.log(FinalColor);
    this.barChartData = Finalarray;
    //this.colors=tempcolor;
    // const FianlRow: FinalData = {} as FinalData;
    // FianlRow.label = "Pending";
    // FianlRow.sta = "Pending";


    // for(var key in i) {
    //   var value = i[];

    //   // do something with "key" and "value" variables
    // }



    // for (let data of Data[0].monthly_status.delivered)
    // {
    //   month.push(data)
    // }
    // console.log('month')
    // console.log(month)
    // for (let entry1 of this.Monthlydata) {
    //   console.log(entry1);
    // }


    debugger;
    this.StatusSumarry1 = [];
    this.StatusAgig1 = [];
    this.Summarydata = [];
    // console.log(Data);
    // console.log(Data[0].all);
    try {
      this.TotalCount = Data[0].all.count;
      this.TotalCount1 = Data[0].all.count;
      this.YotalValue = Data[0].all.order_value;
      // this.TotalValue = (Data[0].all.order_value / 1000).toFixed(0);
      this.TotalValue = (Data[0].all.order_value );
    }
    catch (ex) {
      this.TotalCount = 0;
      this.TotalValue = 0;
    }

    try {
      // this.PendingValue = (Data[0].pending.order_value / 1000).toFixed(0);;
      this.PendingValue = (Data[0].pending.order_value);;
      this.PendingCount = Data[0].pending.count;
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Pending";
      SummaryRow.NoOforder = Data[0].pending.count;
      SummaryRow.OrderValue = Data[0].pending.order_value;
      SummaryRow.orderValueinThous = ((Data[0].pending.order_value ));
      SummaryRow.OrderPerCentage = ((Number(SummaryRow.NoOforder) / this.TotalCount1) * 100).toFixed(2);
      SummaryRow.OrderValuePercentage = ((Number(SummaryRow.OrderValue) / this.YotalValue) * 100).toFixed(2);
      this.StatusSumarry1.push(SummaryRow);

    }
    catch (ex) {
      this.PendingValue = 0;
      this.PendingCount = 0
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Pending";
      SummaryRow.NoOforder = 0;
      SummaryRow.OrderValue = 0;
      SummaryRow.orderValueinThous = "0";
      SummaryRow.OrderPerCentage = "0";
      SummaryRow.OrderValuePercentage = "0";
      this.StatusSumarry1.push(SummaryRow);

    }




    try {
      this.InvoiceCount = Data[0].invoiced.count;
     // this.Invoicedvalue = (Data[0].invoiced.order_value / 1000).toFixed(0);;
      this.Invoicedvalue = (Data[0].invoiced.order_value );;
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Invoiced";
      SummaryRow.NoOforder = Data[0].invoiced.count;
      SummaryRow.OrderValue = Data[0].invoiced.order_value;
      SummaryRow.orderValueinThous = ((Data[0].invoiced.order_value));
      SummaryRow.OrderPerCentage = ((Number(SummaryRow.NoOforder) / this.TotalCount1) * 100).toFixed(2);
      SummaryRow.OrderValuePercentage = ((Number(SummaryRow.OrderValue) / this.YotalValue) * 100).toFixed(2);
      this.StatusSumarry1.push(SummaryRow);
    }
    catch (ex) {
      this.InvoiceCount = 0
      this.Invoicedvalue = 0
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Invoiced";
      SummaryRow.NoOforder = 0;
      SummaryRow.OrderValue = 0;
      SummaryRow.orderValueinThous = "0";
      SummaryRow.OrderPerCentage = "0";
      SummaryRow.OrderValuePercentage = "0";
      this.StatusSumarry1.push(SummaryRow);
    }

    try {
      // this.OutForDeliveryValue = (Data[0].out_for_delivery.order_value / 1000).toFixed(0);;
      this.OutForDeliveryValue = (Data[0].out_for_delivery.order_value );
      this.OutForDeliveryCount = Data[0].out_for_delivery.count;
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Out For Delivery";
      SummaryRow.NoOforder = Data[0].out_for_delivery.count;
      SummaryRow.OrderValue = Data[0].out_for_delivery.order_value;
      SummaryRow.orderValueinThous = (Number(Data[0].out_for_delivery.order_value).toString() );
      SummaryRow.OrderPerCentage = ((Number(SummaryRow.NoOforder) / this.TotalCount1) * 100).toFixed(2);
      SummaryRow.OrderValuePercentage = ((Number(SummaryRow.OrderValue) / this.YotalValue) * 100).toFixed(2);
      this.StatusSumarry1.push(SummaryRow);
    }
    catch (ex) {
      this.OutForDeliveryValue = 0;
      this.OutForDeliveryCount = 0;
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Out For Delivery";
      SummaryRow.NoOforder = 0;
      SummaryRow.OrderValue = 0;
      SummaryRow.orderValueinThous = "0"
      SummaryRow.OrderPerCentage = "0";
      SummaryRow.OrderValuePercentage = "0";
      this.StatusSumarry1.push(SummaryRow);
    }

    try {
      // this.DeleiveryValue = (Data[0].delivered.order_value / 1000).toFixed(0);;
      this.DeleiveryValue = (Data[0].delivered.order_value);
      this.DeliveredCount = Data[0].delivered.count;
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Delivered";
      SummaryRow.NoOforder = Data[0].delivered.count;
      SummaryRow.OrderValue = Data[0].delivered.order_value;
      SummaryRow.orderValueinThous = ((Data[0].delivered.order_value ));
      SummaryRow.OrderPerCentage = ((Number(SummaryRow.NoOforder) / this.TotalCount1) * 100).toFixed(2);
      SummaryRow.OrderValuePercentage = ((Number(SummaryRow.OrderValue) / this.YotalValue) * 100).toFixed(2);
      this.StatusSumarry1.push(SummaryRow);
    }
    catch (ex) {
      this.DeliveredCount = 0
      this.DeleiveryValue = 0
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Delivered";
      SummaryRow.NoOforder = 0;
      SummaryRow.OrderValue = 0;
      SummaryRow.orderValueinThous = "0";
      SummaryRow.OrderPerCentage = "0";
      SummaryRow.OrderValuePercentage = "0";
      this.StatusSumarry1.push(SummaryRow);
    }



    try {
      this.Cancelled = Data[0].Cancelled.count;
      // this.CancelValue = (Data[0].Cancelled.order_value / 1000).toFixed(0);;
      this.CancelValue = (Data[0].Cancelled.order_value);
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Cancelled";
      SummaryRow.NoOforder = Data[0].Cancelled.count;
      SummaryRow.OrderValue = Data[0].Cancelled.order_value;
      SummaryRow.orderValueinThous = ((Data[0].pending.order_value ));
      SummaryRow.OrderPerCentage = ((Number(SummaryRow.NoOforder) / this.TotalCount1) * 100).toFixed(2);
      SummaryRow.OrderValuePercentage = ((Number(SummaryRow.OrderValue) / this.YotalValue) * 100).toFixed(2);
      this.StatusSumarry1.push(SummaryRow);
    }
    catch (ex) {
      this.Cancelled = 0
      this.CancelValue = 0;
      const SummaryRow: Summarydata = {} as Summarydata;
      SummaryRow.Status = "Cancelled";
      SummaryRow.NoOforder = 0;
      SummaryRow.OrderValue = 0;
      SummaryRow.orderValueinThous = "0";
      SummaryRow.OrderPerCentage = "0";
      SummaryRow.OrderValuePercentage = "0";
      this.StatusSumarry1.push(SummaryRow);
    }



    //Aging table


    var Agingdata = Data[0].order_status_aging;












    try {

      const AgingRow: Agingdata = {} as Agingdata;
      AgingRow.Status = "Pending";
      AgingRow.a = Agingdata.pending.zero_to_eight;
      AgingRow.b = Agingdata.pending.eight_to_sixteen;
      AgingRow.c = Agingdata.pending.sixteen_to_twentyfour;

      this.StatusAgig1.push(AgingRow);



    }
    catch (ex) {

      const AgingRow: Agingdata = {} as Agingdata;
      AgingRow.Status = "Pending";
      AgingRow.a = 0;
      AgingRow.b = 0;
      AgingRow.c = 0;

      this.StatusAgig1.push(AgingRow);
    }


    try {

      const AgingRow: Agingdata = {} as Agingdata;
      AgingRow.Status = "Invoiced";
      AgingRow.a = Agingdata.invoiced.zero_to_eight;
      AgingRow.b = Agingdata.invoiced.eight_to_sixteen;
      AgingRow.c = Agingdata.invoiced.sixteen_to_twentyfour;

      this.StatusAgig1.push(AgingRow);
    }
    catch (ex) {

      const AgingRow: Agingdata = {} as Agingdata;
      AgingRow.Status = "Invoiced";
      AgingRow.a = 0;
      AgingRow.b = 0;
      AgingRow.c = 0;

      this.StatusAgig1.push(AgingRow);
    }


    try {

      const AgingRow: Agingdata = {} as Agingdata;
      AgingRow.Status = "Out For Delivery";
      AgingRow.a = Agingdata.out_for_delivery.zero_to_eight;
      AgingRow.b = Agingdata.out_for_delivery.eight_to_sixteen;
      AgingRow.c = Agingdata.out_for_delivery.sixteen_to_twentyfour;

      this.StatusAgig1.push(AgingRow);
    }
    catch (ex) {

      const AgingRow: Agingdata = {} as Agingdata;
      AgingRow.Status = "Out For Delivery";
      AgingRow.a = 0;
      AgingRow.b = 0;
      AgingRow.c = 0;

      this.StatusAgig1.push(AgingRow);
    }


    try {

      const AgingRow: Agingdata = {} as Agingdata;
      AgingRow.Status = "Delivered";
      AgingRow.a = Agingdata.delivered.zero_to_eight;
      AgingRow.b = Agingdata.delivered.eight_to_sixteen;
      AgingRow.c = Agingdata.delivered.sixteen_to_twentyfour;

      this.StatusAgig1.push(AgingRow);
    }
    catch (ex) {

      const AgingRow: Agingdata = {} as Agingdata;
      AgingRow.Status = "Delivered";
      AgingRow.a = 0;
      AgingRow.b = 0;
      AgingRow.c = 0;

      this.StatusAgig1.push(AgingRow);
    }


    // try {

    //   const AgingRow: Agingdata = {} as Agingdata;
    //   AgingRow.Status = "Cancelled";
    //   AgingRow.a = Agingdata.Cancelled.eight_to_sixteen;
    //   AgingRow.b = Agingdata.Cancelled.sixteen_to_twentyfour;
    //   AgingRow.c = Agingdata.Cancelled.zero_to_eight;

    //   this.StatusAgig1.push(AgingRow);
    // }
    // catch (ex) {

    //   const AgingRow: Agingdata = {} as Agingdata;
    //   AgingRow.Status = "Cancelled";
    //   AgingRow.a = 0;
    //   AgingRow.b = 0;
    //   AgingRow.c = 0;

    //   this.StatusAgig1.push(AgingRow);
    // }


    //?For BarChart Summary data
    var MonthlyStatusdata = Data[0].monthly_status;

    // for (let entry1 of this.Monthlydata) {
    //   console.log(entry1);
    // }

    // for (let Key of MonthlyStatusdata) {
    //   console.log(Key);
    // }




    var Canceldata = MonthlyStatusdata.Cancelled;
    var Deliverddata = MonthlyStatusdata.delivered;
    var Invoiced = MonthlyStatusdata.invoiced;
    var OutForDelivery = MonthlyStatusdata.out_for_delivery;
    var pendingData = MonthlyStatusdata.pending;

    // const AgingRow1: AgingGraph = {} as AgingGraph;

    // AgingRow1.data = [pendingData.Jan.count, pendingData.Feb.count, pendingData.Mar.count, pendingData.Apr.count]
    // AgingRow1.label = "Pending"
    // this.Summarydata.push(AgingRow1);


    // const AgingRow2: AgingGraph = {} as AgingGraph;

    // AgingRow2.data = [Invoiced.Jan.count, Invoiced.Feb.count, Invoiced.Mar.count, Invoiced.Apr.count]
    // AgingRow2.label = "Invoiced"
    // this.Summarydata.push(AgingRow2);




    // const AgingRow3: AgingGraph = {} as AgingGraph;

    // AgingRow3.data = [OutForDelivery.Jan.count, OutForDelivery.Feb.count, OutForDelivery.Mar.count, OutForDelivery.Apr.count]
    // AgingRow3.label = "Out For Delivery"
    // this.Summarydata.push(AgingRow3);



    // const AgingRow4: AgingGraph = {} as AgingGraph;

    // AgingRow4.data = [Deliverddata.Jan.count, Deliverddata.Feb.count, Deliverddata.Mar.count, Deliverddata.Apr.count]
    // AgingRow4.label = "Delivered"
    // this.Summarydata.push(AgingRow4);






    // const AgingRow5: AgingGraph = {} as AgingGraph;

    // AgingRow5.data = [Canceldata.Jan.count, Canceldata.Feb.count, Canceldata.Mar.count, Canceldata.Apr.count]
    // AgingRow5.label = "Cancelled"
    // this.Summarydata.push(AgingRow5);


    //this.barChartData=this.Summarydata;
    //console.log(this.barChartData);


    //  barChartData: ChartDataSets[] = [
    //   { data: [10, 5, 8, 9], label: 'Pending' },
    //   { data: [3, 8, 4, 6], label: 'Invoiced' },
    //   { data: [13, 3, 6, 9], label: 'Out For Delivery' },
    //   { data: [9, 5, 3, 14], label: 'Delivered' },
    //   { data: [12, 6, 9, 2], label: 'Cancelled' },

    // ];

  }



}




export class ListInput {

  month: string
  year: string
  from_date: string
  to_date: string
  div_id: string
  invoice_status: string
  distributor_id: string

  // monthly_statistic_from_date: string
  // count_from_date: string
  // tracking_from_date: string

}

export class Summarydata {
  Status: string
  NoOforder: number
  OrderPerCentage: string
  OrderValue: number
  OrderValuePercentage: string
  orderValueinThous: string
}


export class Agingdata {
  Status: string
  a: number
  b: number
  c: number
}


export class AgingGraph {

  data: any[]
  label: string


}


export class FinalData {

  data: any[]
  label: string


}

export class Barchartcolor {

  backgroundColor: any[]



}


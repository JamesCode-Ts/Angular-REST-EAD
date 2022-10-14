import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UserChart } from 'src/app/model/UserChart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private usuaruoService: UsuarioService) { }

  userChart = new UserChart();

  ngOnInit(): void {

    /**Ao alimentar os valores do bancd de dados para o gráfico é preciso
     * Que os formatos das strings venham do formato que o gráfco aceite.
     */
    this.usuaruoService.carregarGrafico().subscribe (data => {
      this.userChart = data;

      /*Nomes */
      this.barChartLabels = this.userChart.nome.replace(/[\\"]/g, '').split(',');

      /*Salario */
      var arraySalario = JSON.parse('[' + this.userChart.salario + ']');

      this.barChartData = [
       { data: arraySalario, label: 'Salário Usuário' }
     ];

    });
  }


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Salário Usuário' }
  ];

}

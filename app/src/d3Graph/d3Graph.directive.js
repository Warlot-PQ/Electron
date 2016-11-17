(function () {
  'use strict';
  angular.module('app')
      .directive('dGraph', [d3GraphDirective])
      .controller('dGraphController', ['$scope', d3GraphController]);

  function d3GraphDirective() {
    return {
      restrict: 'AE',
      template: '<div class="graphD3"></div>',
      link: function(scope, elem, attrs) {
        // Display graph once data loaded
        scope.$watch('grapheDatas', function (grapheDatas) {
          displayGraph(grapheDatas);
        });
      }
    }
  }

  function d3GraphController($scope) {
    // Load data to display
    $scope.grapheDatas = [
      { label: 'Abulia', count: 10 },
      { label: 'Betelgeuse', count: 20 },
      { label: 'Cantaloupe', count: 30 },
      { label: 'Dijkstra', count: 40 }
    ];
  }

  function displayGraph(dataset) {
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);

    var svg = d3.select('.graphD3')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');

    var arc = d3.arc()
        .innerRadius(radius - 40)
        .outerRadius(radius);

    var pie = d3.pie()
        .value(function(d) { return d.count; })
        .sort(null);

    var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
          return color(d.data.label);
        });

    svg.selectAll("text").data(pie(dataset))
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", function(d) {
          var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
          d.cx = Math.cos(a) * (radius - 65);
          return d.x = Math.cos(a) * (radius - 20);
        })
        .attr("y", function(d) {
          var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
          d.cy = Math.sin(a) * (radius - 65);
          return d.y = Math.sin(a) * (radius - 20);
        })
        .text(function(d) { return d.value; })
  }
})();
// Use D3 to read in samples.json
// Create Charts with function
function createCharts(id){
    d3.json("data/samples.json").then((data) => {
        //filter data for first 10 items
        let filterData = data.samples.filter(s => s.id == id)
        let firstItem = filterData[0]
        let trace1 = {
            x: firstItem.sample_values.slice(0,10).reverse(),
            y: firstItem.otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
            text: firstItem.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
        let dataPlot = [trace1];

        let layout = {
            title: "Top 10 Barteria - Selected Subject",
        };

        //Plot data with plotly method
        Plotly.newPlot("bar1", dataPlot, layout);

        sumArray = []
        
        data.samples.forEach((sample) => {
            console.log(sample)
            let i = 0
            sample.sample_values.forEach((value) => {
            sumArray[i] = 0
            i++

            })
            i=0
            sample.sample_values.forEach((value) => {
                sumArray[i] += value
                i++

            })
                     
        });
        console.log(sumArray)

        let trace2 = {
            x: firstItem.sample_values.slice(0,10).reverse(),
            y: firstItem.otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
            text: firstItem.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
        let dataPlot2 = [trace2];

        let layout2 = {
            title: "Top 10 Barteria - All Subjects",
        };

    
        Plotly.newPlot("bar2", dataPlot2, layout2);

        //Bubble Chart
        let trace3 = {
            x: firstItem.otu_ids,
            y: firstItem.sample_values,
            mode: 'markers',
            marker: {
                size: firstItem.sample_values,
            }
        };
        let dataPlot3 = [trace3];

        let layout3 = {
            title: "Top 10 Barteria - All Subjects",
        };

    
        Plotly.newPlot("bubble", dataPlot3, layout3);

    });
}

//Create function to obtain all data from samples.json
function findData() {
    d3.json("data/samples.json").then((data) => {
        console.log(data)
        let dropdown = d3.select("#selDataset")
        data.names.forEach((subject) => {
            dropdown.append("option").text(subject)
            .property("value", subject)
        });
        createCharts(data.names[0])
    });

};
findData()
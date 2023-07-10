console.log("Confirm that this is working")

const URL = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// TO DOs:
// Add demographics table

function buildCharts(sample){
    d3.json(URL).then(d=>{

        // -----------------Bar Chart--------------------
        let Samples = d.samples
        Samples_filtered = Samples.filter(d2 => d2.id == sample)
     
        var xValues = Samples_filtered[0].sample_values.slice(0,10)
        var yValues = Samples_filtered[0].otu_ids.slice(0,10)
        var hoverText = Samples_filtered[0].otu_labels.slice(0,10)

        yValuesString = yValues.map(x => `OTU ${x}`)

        let trace1 = {
            // reversing so they can be ordered in descending
            x: xValues.reverse(),
            y: yValuesString.reverse(),
            text: hoverText.reverse(),
            type:'bar',
            orientation:'h'
        }

        let traceData = [trace1]

        let layout = {
            title: 'Top 10 OTUs'
        }

        Plotly.newPlot('plot', traceData, layout)
 
        // -----------------Bubble Chart--------------------

        var xValues2 = Samples_filtered[0].sample_values
        var yValues2 = Samples_filtered[0].otu_ids
        var hoverText2 = Samples_filtered[0].otu_labels


        let trace2 = {
            x: yValues2,
            y: xValues2,
            text: hoverText2,
            mode: 'markers',
            marker: {
                color: yValues2,
            size: xValues2   
            }
            
        }

        let traceData2 = [trace2]

        let layout2 = {
            title: 'Scatter Plot'
        }
        
        Plotly.newPlot('plot2', traceData2, layout2)

        // -----------------Demographics table--------------------
        
        let Samples3 = d.metadata;
        Samples_filtered2 = Samples3.filter(d4 => d4.id == sample);
        
        const metadataDiv = d3.select('#sample-metadata');
        
        metadataDiv.selectAll('p')
          .data(Samples_filtered2)
          .enter()
          .append('p')
          .text(d => `ID: ${d.id}, Ethnicity: ${d.ethnicity}, Gender: ${d.gender}, Age: ${d.age}, Location: ${d.location}, BBType: ${d.bbtype}, WFreq: ${d.wfreq}`);
    }) 
}


function optionChanged(SubjectID) {
    buildCharts(SubjectID);
    
}

function initialize() {
    // populate the dropdown menu
    d3.json(URL).then(d=>{
        var subjectIDs = d.names;
        console.log(subjectIDs);
        var select = d3.select('#selDataset');
        for (let i = 0; i < subjectIDs.length; i++) {
            select.append("option").property("value",subjectIDs[i]).text(subjectIDs[i]);   
        }
    });
    // draw the plots for the first subject
    console.log(initialize);

}

initialize();

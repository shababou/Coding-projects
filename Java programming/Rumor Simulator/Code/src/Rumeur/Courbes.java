/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Rumeur;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import javax.swing.GroupLayout;
import javax.swing.JPanel;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartFrame;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;

/**
 *
 * @author Simon
 */
public class Courbes 
{
    String titre;
    String titre1;
    String titre2;
    String xTitre;
    String yTitre;
    
    public Courbes(String titre,String titre1,String titre2,String xTitre,String yTitre,double[] x,double[] y,double[] z)
    {
        this.titre = titre;
        this.titre1 = titre1;
        this.titre2 = titre2;
        this.xTitre = xTitre;
        this.yTitre = yTitre;
        XYSeries series1 = new XYSeries(titre1);
        XYSeries series2 = new XYSeries(titre2);
        for(int i=0;i<x.length;i++)
        {
            series1.add(x[i],y[i]);
            series2.add(x[i],z[i]);
        }
        // Add the series to your data set
        XYSeriesCollection dataset = new XYSeriesCollection();
        dataset.addSeries(series1);
        dataset.addSeries(series2);
        // Generate the graph
        JFreeChart chart = ChartFactory.createXYLineChart
        (
         titre, // Title
         xTitre, // x-axis Label
         yTitre, // y-axis Label
         dataset, // Dataset
         PlotOrientation.VERTICAL, // Plot Orientation
         true, // Show Legend
         true, // Use tooltips
         false // Configure chart to generate URLs?
       );
       ChartFrame frame = new ChartFrame("First", chart);
       frame.pack(); 
       //frame.setVisible(true); 
       
       try 
       {
           ChartUtilities.saveChartAsJPEG(new File("chart.jpg"), chart, 500, 300);
       } 
       catch (IOException e)
       {
           System.err.println("Problem occurred creating chart.");
       }
    }
}
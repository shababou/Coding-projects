

package IHMcoach;

import Reseaux.*;
import javax.swing.DefaultListModel;
import liguapoulpe.*;

/**
 *  Cette classe lance l'ecran agenda ou on affiche les resultats des matchs
 * @author Gus
 */
public class CH_5_Agenda extends javax.swing.JFrame {

    Tournament t;
    int nc;
    String [][] Tab_Agenda;
    CH_4_TournoiPremierePhase CH4;
    CH_8_FinalPhase CH8;
    TCP_SERVER myTCP;
    private String myIPadress, hostIPadress;
    private int port;

    ///////////////////////////////LIST MODEL/////////////////////////
    DefaultListModel Nom1Model = new DefaultListModel();
    DefaultListModel Nom2Model = new DefaultListModel();
    DefaultListModel Score1Model = new DefaultListModel();
    DefaultListModel Score2Model = new DefaultListModel();

    /**
    ///////////////////////////CONSTRUCTOR SI ON VIENT DE LA///////////
    //////////////////////////PREMIERE PHASE//////////////////////////
     */
    public CH_5_Agenda(String hostIPadress,int port,String myIPadress,TCP_SERVER myTCP,CH_4_TournoiPremierePhase CH4) {

        super("Agenda");
        initComponents();
        this.setSize(800, 600);
        this.setResizable(false);
        this.hostIPadress=hostIPadress;
        this.myTCP=myTCP;
        this.myIPadress=myIPadress;
        this.port=port;

        this.t=myTCP.getTournament();
        this.nc = myTCP.getMyID();
        
        Tab_Agenda = t.getAgenda();
        this.CH4 = CH4;
        //////////////////////////////////////////////////////////////////////
        ///////////////////////////LOAD MODELS////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        Nom1Model.add(0, "TEAM 1");
        Nom2Model.add(0, "TEAM 2");
        Score1Model.add(0, "SCORE 1");
        Score2Model.add(0, "SCORE 2");
        for (int i=0;i<24;i++){
            Nom1Model.add(i+1, Tab_Agenda[i][0]);
            Nom2Model.add(i+1, Tab_Agenda[i][3]);
            Score1Model.add(i+1, Tab_Agenda[i][1]);
            Score2Model.add(i+1, Tab_Agenda[i][2]);
        }
    }

    /**
    //////////////////////////////////////CONSTRUCTEUR SI ON VIENT////////////
    ////////////////////////DE LA PHASE FINALE/////////////////////////////////
    */
    public CH_5_Agenda(String hostIPadress,int port,String myIPadress,TCP_SERVER myTCP,CH_8_FinalPhase CH8) {

        super("Agenda");
        initComponents();
        this.setSize(800, 600);
        this.setResizable(false);
            this.hostIPadress=hostIPadress;
        this.myTCP=myTCP;
        this.myIPadress=myIPadress;
        this.port=port;

        this.t=myTCP.getTournament();
        this.nc = myTCP.getMyID();
        Tab_Agenda = t.getAgenda();
        this.CH8 = CH8;
        //////////////////////////////////////////////////////////////////////
        ///////////////////////////LOAD MODELS////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        Nom1Model.add(0, "TEAM 1");
        Nom2Model.add(0, "TEAM 2");
        Score1Model.add(0, "SCORE 1");
        Score2Model.add(0, "SCORE 2");
        for (int i=0;i<31;i++){
            Nom1Model.add(i+1, Tab_Agenda[i][0]);
            Nom2Model.add(i+1, Tab_Agenda[i][3]);
            Score1Model.add(i+1, Tab_Agenda[i][1]);
            Score2Model.add(i+1, Tab_Agenda[i][2]);
        }
        
    }



    /** This method is called from within the constructor to
     * initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is
     * always regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jButton1 = new javax.swing.JButton();
        jScrollPane3 = new javax.swing.JScrollPane();
        Score1List = new javax.swing.JList(Score1Model);
        jScrollPane4 = new javax.swing.JScrollPane();
        Score2List = new javax.swing.JList(Score2Model);
        jScrollPane2 = new javax.swing.JScrollPane();
        Name2List = new javax.swing.JList(Nom2Model);
        jScrollPane1 = new javax.swing.JScrollPane();
        Nom1List = new javax.swing.JList(Nom1Model);
        wallpaper = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jButton1.setText("RETURN");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });
        getContentPane().add(jButton1, new org.netbeans.lib.awtextra.AbsoluteConstraints(350, 550, 80, 20));

        jScrollPane3.setViewportView(Score1List);

        getContentPane().add(jScrollPane3, new org.netbeans.lib.awtextra.AbsoluteConstraints(240, 10, 150, 540));

        jScrollPane4.setViewportView(Score2List);

        getContentPane().add(jScrollPane4, new org.netbeans.lib.awtextra.AbsoluteConstraints(390, 10, 150, 540));

        jScrollPane2.setViewportView(Name2List);

        getContentPane().add(jScrollPane2, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 10, 150, 540));

        jScrollPane1.setViewportView(Nom1List);

        getContentPane().add(jScrollPane1, new org.netbeans.lib.awtextra.AbsoluteConstraints(90, 10, 150, 540));

        wallpaper.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/pelouse.jpg")));
        getContentPane().add(wallpaper, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 800, 600));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    /**
     *
     * Ce bouton retourne a l'ecran de la premier phase
     */
    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        if(CH4 != null){  ///Si on vient de la premiere phase
            CH4.setVisible(true);
            this.dispose();
        }
        else{   /// Si on vient de la Phase Finale
            CH8.setVisible(true);
            this.dispose();
        }
    }//GEN-LAST:event_jButton1ActionPerformed




    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JList Name2List;
    private javax.swing.JList Nom1List;
    private javax.swing.JList Score1List;
    private javax.swing.JList Score2List;
    private javax.swing.JButton jButton1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JScrollPane jScrollPane4;
    private javax.swing.JLabel wallpaper;
    // End of variables declaration//GEN-END:variables

}

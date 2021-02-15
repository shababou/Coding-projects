
package IHMcoach;
import liguapoulpe.*;
import Reseaux.*;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.MediaTracker;
import java.awt.Toolkit;
import javax.swing.DefaultListModel;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;


/**
 *
 * Cette fenetre affiche les equipes qui sont deja crees
 */
public class CH_1_ecrandinscription extends javax.swing.JFrame {

    TCP_SERVER myTCP;
    private String myIPadress, hostIPadress;
    private int port;

    Coach [] nomCoach;
    String [] Coachs;
    int nc;
    String  nomTeam;
    Tournament t;
    DefaultListModel ListModelCoach = new DefaultListModel();
    DefaultListModel ListModelTeam = new DefaultListModel();

    /**
     *  Constructeur de la classe
     */
    public CH_1_ecrandinscription(String hostIPadress,int port,String myIPadress,TCP_SERVER myTCP) {
        
        
        super("Create new team");
        this.myTCP=myTCP;
        this.myIPadress=myIPadress;
        this.port=port;
        this.hostIPadress=hostIPadress;

        
        initComponents();
        this.setSize(800, 600);
        this.setResizable(false);
        this.setVisible(true);

        nc = myTCP.getTournament().getNumberOfCoachPLayer();
        nomCoach = new Coach[nc];
        nomCoach = myTCP.getTournament().getCoach();


        Coachs = new String[nc];


        int j=1;
        ListModelCoach.add(0,"COACH'S NAME");
        ListModelTeam.add(0,"TEAM'S NAME");
        for(int i = 0; i < nc;i++){
            if(myTCP.getTournament().getIemeCoach(i).getState()==true){
                nomTeam = myTCP.getTournament().getCoach()[i].getTeam().getName();
                ListModelCoach.add(j,nomCoach[i].getName());
                ListModelCoach.add(j+1,"___________________");
                ListModelTeam.add(j,nomTeam);
                ListModelTeam.add(j+1,"--------------------");
                j=j+2;
            }

        }

    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        ListEquipe1 = new javax.swing.JScrollPane();
        TeamList = new javax.swing.JList(ListModelTeam);
        ListEquipe = new javax.swing.JScrollPane();
        CoachList = new javax.swing.JList(ListModelCoach);
        NewTeam = new javax.swing.JButton();
        wallpaper = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        getContentPane().setLayout(null);

        TeamList.setFont(new java.awt.Font("DejaVu LGC Sans Condensed", 1, 14)); // NOI18N
        ListEquipe1.setViewportView(TeamList);

        getContentPane().add(ListEquipe1);
        ListEquipe1.setBounds(410, 180, 270, 380);

        CoachList.setFont(new java.awt.Font("DejaVu LGC Sans Condensed", 1, 14)); // NOI18N
        ListEquipe.setViewportView(CoachList);

        getContentPane().add(ListEquipe);
        ListEquipe.setBounds(140, 180, 270, 380);

        NewTeam.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/Bouton_newteam.jpg")));
        NewTeam.setText("jButton1");
        NewTeam.setIconTextGap(1);
        NewTeam.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                NewTeamActionPerformed(evt);
            }
        });
        getContentPane().add(NewTeam);
        NewTeam.setBounds(240, 70, 310, 70);
        NewTeam.getAccessibleContext().setAccessibleName("");

        wallpaper.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/pelouse.jpg")));
        getContentPane().add(wallpaper);
        wallpaper.setBounds(0, 0, 800, 600);

        pack();
    }// </editor-fold>//GEN-END:initComponents

    /**
     *
     * Ce bouton lance l'ecran suivante
     */
    private void NewTeamActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_NewTeamActionPerformed
        CH_2_Creationdequipe CH2 = new CH_2_Creationdequipe(hostIPadress,port,myIPadress,myTCP);
        CH2.setVisible(true);
        this.setVisible(false);

    }//GEN-LAST:event_NewTeamActionPerformed




    

   
    // Variables declaration - do not modify//GEN-BEGIN:variables
    public javax.swing.JList CoachList;
    private javax.swing.JScrollPane ListEquipe;
    private javax.swing.JScrollPane ListEquipe1;
    private javax.swing.JButton NewTeam;
    public javax.swing.JList TeamList;
    private javax.swing.JLabel wallpaper;
    // End of variables declaration//GEN-END:variables
}

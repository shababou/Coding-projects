

package IHMcoach;

import Reseaux.*;
import java.util.ArrayList;
import javax.swing.DefaultListModel;
import liguapoulpe.*;

/**
 *  Cette classe affiche des tableaux avec le resultat et la clasification
 *  dans la premier phase du tournoi
 * @author Gus
 */
public class CH_4_TournoiPremierePhase extends javax.swing.JFrame {

    Tournament t;
    int nc;
    int numberOfRounds=0;
    ArrayList<Team> temporal;
    ArrayList<Team> temporalA;
    ArrayList<Team> temporalB;
    ArrayList<Team> temporalC;
    ArrayList<Team> temporalD;
    int nombreGroup;
    CH_5_Agenda CH5;
    CH_6_Coaching CH6;
    CH_7_MATCH CH7;
    CH_8_FinalPhase CH8;
    TCP_SERVER myTCP;
    private String hostIPadress, myIPadress;
    private int port;
    boolean button=true;


    /////////////////////////////NAMEMODEL////////////////////////////
    DefaultListModel ANameModel = new DefaultListModel();
    DefaultListModel BNameModel = new DefaultListModel();
    DefaultListModel CNameModel = new DefaultListModel();
    DefaultListModel DNameModel = new DefaultListModel();
    ////////////////////////////PTSMODEL////////////////////////////////
    DefaultListModel APTSModel = new DefaultListModel();
    DefaultListModel BPTSModel = new DefaultListModel();
    DefaultListModel CPTSModel = new DefaultListModel();
    DefaultListModel DPTSModel = new DefaultListModel();
    ////////////////////////////GFMODEL///////////////////////////////////
    DefaultListModel AGFModel = new DefaultListModel();
    DefaultListModel BGFModel = new DefaultListModel();
    DefaultListModel CGFModel = new DefaultListModel();
    DefaultListModel DGFModel = new DefaultListModel();
    ////////////////////////////GAMODEL//////////////////////////////////
    DefaultListModel AGAModel = new DefaultListModel();
    DefaultListModel BGAModel = new DefaultListModel();
    DefaultListModel CGAModel = new DefaultListModel();
    DefaultListModel DGAModel = new DefaultListModel();
    //////////////////////////////DIFMODEL////////////////////////////////
    DefaultListModel ADIFModel = new DefaultListModel();
    DefaultListModel BDIFModel = new DefaultListModel();
    DefaultListModel CDIFModel = new DefaultListModel();
    DefaultListModel DDIFModel = new DefaultListModel();

    Team team;

    /**
     *  Constructeur de la classe
     */
    public CH_4_TournoiPremierePhase(String hostIPadress,int port,String myIPadress,TCP_SERVER myTCP) {

        super("Tournoi 1ere phase");
        
        this.setSize(800, 600);
        this.setResizable(false);
        this.hostIPadress=hostIPadress;
        this.myIPadress=myIPadress;
        this.myTCP=myTCP;
        this.port=port;
        this.t=myTCP.getTournament();
        this.nc = myTCP.getMyID();
        //t.getIemeCoach(nc).invalidateCoach();
        //////////////////////////////////////////////////
        ////////////////////MODELs////////////////////////
        //////////////////////////////////////////////////
        ANameModel.addElement("NAME");
        BNameModel.addElement("NAME");
        CNameModel.addElement("NAME");
        DNameModel.addElement("NAME");
        APTSModel.addElement("PTS");
        BPTSModel.addElement("PTS");
        CPTSModel.addElement("PTS");
        DPTSModel.addElement("PTS");
        AGFModel.addElement("GF");
        BGFModel.addElement("GF");
        CGFModel.addElement("GF");
        DGFModel.addElement("GF");
        AGAModel.addElement("GA");
        BGAModel.addElement("GA");
        CGAModel.addElement("GA");
        DGAModel.addElement("GA");
        ADIFModel.addElement("DIF");
        BDIFModel.addElement("DIF");
        CDIFModel.addElement("DIF");
        DDIFModel.addElement("DIF");
    if(myTCP.getPhase()==0)
    {
        System.out.println("after"+myTCP.getPhase());
        temporalA = t.getGroupA().getTeams();
        for(int i = 0; i<temporalA.size();i++){
            team = temporalA.get(i);
            ANameModel.add(i+1, team.getName());
            APTSModel.add(i+1,team.getRankingCaracteristics()[0]);
            AGFModel.add(i+1,team.getRankingCaracteristics()[1]);
            AGAModel.add(i+1,team.getRankingCaracteristics()[2]);
            ADIFModel.add(i+1,team.getRankingCaracteristics()[3]);
        }
        temporalB = t.getGroupB().getTeams();
        for(int i = 0; i<temporalB.size();i++){
            team = temporalB.get(i);
            BNameModel.add(i+1, team.getName());
            BPTSModel.add(i+1,team.getRankingCaracteristics()[0]);
            BGFModel.add(i+1,team.getRankingCaracteristics()[1]);
            BGAModel.add(i+1,team.getRankingCaracteristics()[2]);
            BDIFModel.add(i+1,team.getRankingCaracteristics()[3]);
        }
        temporalC = t.getGroupC().getTeams();
        for(int i = 0; i<temporalC.size();i++){
            team = temporalC.get(i);
            CNameModel.add(i+1, team.getName());
            CPTSModel.add(i+1,team.getRankingCaracteristics()[0]);
            CGFModel.add(i+1,team.getRankingCaracteristics()[1]);
            CGAModel.add(i+1,team.getRankingCaracteristics()[2]);
            CDIFModel.add(i+1,team.getRankingCaracteristics()[3]);
        }
        temporalD = t.getGroupD().getTeams();
        for(int i = 0; i<temporalD.size();i++){
            team = temporalD.get(i);
            DNameModel.add(i+1, team.getName());
            DPTSModel.add(i+1,team.getRankingCaracteristics()[0]);
            DGFModel.add(i+1,team.getRankingCaracteristics()[1]);
            DGAModel.add(i+1,team.getRankingCaracteristics()[2]);
            DDIFModel.add(i+1,team.getRankingCaracteristics()[3]);
        }
   
        }

        initComponents();
    }

    /** This method is called from within the constructor to
     * initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is
     * always regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        GroupA = new javax.swing.JLabel();
        GroupB = new javax.swing.JLabel();
        GroupC = new javax.swing.JLabel();
        GroupD = new javax.swing.JLabel();
        jScrollPane9 = new javax.swing.JScrollPane();
        D_PTS = new javax.swing.JList(DPTSModel);
        jScrollPane1 = new javax.swing.JScrollPane();
        B_NameList = new javax.swing.JList(BNameModel);
        jScrollPane2 = new javax.swing.JScrollPane();
        A_NameList = new javax.swing.JList(ANameModel);
        jScrollPane3 = new javax.swing.JScrollPane();
        C_NameList = new javax.swing.JList(CNameModel);
        jScrollPane4 = new javax.swing.JScrollPane();
        D_NameList = new javax.swing.JList(DNameModel);
        jScrollPane6 = new javax.swing.JScrollPane();
        A_GA = new javax.swing.JList(AGAModel);
        jScrollPane5 = new javax.swing.JScrollPane();
        A_GF = new javax.swing.JList(AGFModel);
        jScrollPane16 = new javax.swing.JScrollPane();
        C_GF = new javax.swing.JList(CGFModel);
        jScrollPane7 = new javax.swing.JScrollPane();
        A_PTS = new javax.swing.JList(APTSModel);
        jScrollPane8 = new javax.swing.JScrollPane();
        A_DIF = new javax.swing.JList(ADIFModel);
        jScrollPane10 = new javax.swing.JScrollPane();
        C_GA = new javax.swing.JList(CGAModel);
        jScrollPane11 = new javax.swing.JScrollPane();
        C_DIF = new javax.swing.JList(CDIFModel);
        jScrollPane12 = new javax.swing.JScrollPane();
        C_PTS = new javax.swing.JList(CPTSModel);
        jScrollPane13 = new javax.swing.JScrollPane();
        D_GF = new javax.swing.JList(DGFModel);
        jScrollPane14 = new javax.swing.JScrollPane();
        D_GA = new javax.swing.JList(DGAModel);
        jScrollPane15 = new javax.swing.JScrollPane();
        D_DIF = new javax.swing.JList(DDIFModel);
        jScrollPane17 = new javax.swing.JScrollPane();
        B_GF = new javax.swing.JList(BGFModel);
        jScrollPane18 = new javax.swing.JScrollPane();
        B_GA = new javax.swing.JList(BGAModel);
        jScrollPane19 = new javax.swing.JScrollPane();
        B_DIF = new javax.swing.JList(BDIFModel);
        jScrollPane20 = new javax.swing.JScrollPane();
        B_PTS = new javax.swing.JList(BPTSModel);
        Coaching = new javax.swing.JButton();
        NextGame = new javax.swing.JButton();
        Agenda = new javax.swing.JButton();
        wallpaper = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        GroupA.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/GroupA.jpg")));
        getContentPane().add(GroupA, new org.netbeans.lib.awtextra.AbsoluteConstraints(100, 40, -1, -1));

        GroupB.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/GroupB.jpg")));
        getContentPane().add(GroupB, new org.netbeans.lib.awtextra.AbsoluteConstraints(500, 40, -1, -1));

        GroupC.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/GroupC.jpg")));
        getContentPane().add(GroupC, new org.netbeans.lib.awtextra.AbsoluteConstraints(100, 290, -1, -1));

        GroupD.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/GroupD.jpg")));
        getContentPane().add(GroupD, new org.netbeans.lib.awtextra.AbsoluteConstraints(500, 290, -1, -1));

        D_PTS.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane9.setViewportView(D_PTS);

        getContentPane().add(jScrollPane9, new org.netbeans.lib.awtextra.AbsoluteConstraints(620, 370, 40, 120));

        B_NameList.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane1.setViewportView(B_NameList);

        getContentPane().add(jScrollPane1, new org.netbeans.lib.awtextra.AbsoluteConstraints(410, 140, 210, 120));

        A_NameList.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        jScrollPane2.setViewportView(A_NameList);

        getContentPane().add(jScrollPane2, new org.netbeans.lib.awtextra.AbsoluteConstraints(20, 140, 210, 120));

        C_NameList.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        jScrollPane3.setViewportView(C_NameList);

        getContentPane().add(jScrollPane3, new org.netbeans.lib.awtextra.AbsoluteConstraints(20, 370, 210, 120));

        D_NameList.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane4.setViewportView(D_NameList);

        getContentPane().add(jScrollPane4, new org.netbeans.lib.awtextra.AbsoluteConstraints(410, 370, 210, 120));

        A_GA.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane6.setViewportView(A_GA);

        getContentPane().add(jScrollPane6, new org.netbeans.lib.awtextra.AbsoluteConstraints(310, 140, 40, 120));

        A_GF.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane5.setViewportView(A_GF);

        getContentPane().add(jScrollPane5, new org.netbeans.lib.awtextra.AbsoluteConstraints(270, 140, 40, 120));

        C_GF.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        jScrollPane16.setViewportView(C_GF);

        getContentPane().add(jScrollPane16, new org.netbeans.lib.awtextra.AbsoluteConstraints(270, 370, 40, 120));

        A_PTS.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane7.setViewportView(A_PTS);

        getContentPane().add(jScrollPane7, new org.netbeans.lib.awtextra.AbsoluteConstraints(230, 140, 40, 120));

        A_DIF.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        jScrollPane8.setViewportView(A_DIF);

        getContentPane().add(jScrollPane8, new org.netbeans.lib.awtextra.AbsoluteConstraints(350, 140, 40, 120));

        C_GA.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane10.setViewportView(C_GA);

        getContentPane().add(jScrollPane10, new org.netbeans.lib.awtextra.AbsoluteConstraints(310, 370, 40, 120));

        C_DIF.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane11.setViewportView(C_DIF);

        getContentPane().add(jScrollPane11, new org.netbeans.lib.awtextra.AbsoluteConstraints(350, 370, 40, 120));

        C_PTS.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        jScrollPane12.setViewportView(C_PTS);

        getContentPane().add(jScrollPane12, new org.netbeans.lib.awtextra.AbsoluteConstraints(230, 370, 40, 120));

        D_GF.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane13.setViewportView(D_GF);

        getContentPane().add(jScrollPane13, new org.netbeans.lib.awtextra.AbsoluteConstraints(660, 370, 40, 120));

        D_GA.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane14.setViewportView(D_GA);

        getContentPane().add(jScrollPane14, new org.netbeans.lib.awtextra.AbsoluteConstraints(700, 370, 40, 120));

        D_DIF.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        jScrollPane15.setViewportView(D_DIF);

        getContentPane().add(jScrollPane15, new org.netbeans.lib.awtextra.AbsoluteConstraints(740, 370, 40, 120));

        B_GF.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane17.setViewportView(B_GF);

        getContentPane().add(jScrollPane17, new org.netbeans.lib.awtextra.AbsoluteConstraints(660, 140, 40, 120));

        B_GA.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane18.setViewportView(B_GA);

        getContentPane().add(jScrollPane18, new org.netbeans.lib.awtextra.AbsoluteConstraints(700, 140, 40, 120));

        B_DIF.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane19.setViewportView(B_DIF);

        getContentPane().add(jScrollPane19, new org.netbeans.lib.awtextra.AbsoluteConstraints(740, 140, 40, 120));

        B_PTS.setFont(new java.awt.Font("Comic Sans MS", 1, 14));
        jScrollPane20.setViewportView(B_PTS);

        getContentPane().add(jScrollPane20, new org.netbeans.lib.awtextra.AbsoluteConstraints(620, 140, 40, 120));

        Coaching.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/Coaching.jpg")));
        Coaching.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                CoachingActionPerformed(evt);
            }
        });
        getContentPane().add(Coaching, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 510, 250, 70));

        NextGame.setEnabled(false);
        NextGame.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/NextGame.jpg")));
        NextGame.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                NextGameActionPerformed(evt);
            }
        });
        getContentPane().add(NextGame, new org.netbeans.lib.awtextra.AbsoluteConstraints(250, 510, 300, 70));

        Agenda.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/Agenda.jpg")));
        Agenda.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                AgendaActionPerformed(evt);
            }
        });
        getContentPane().add(Agenda, new org.netbeans.lib.awtextra.AbsoluteConstraints(550, 510, 250, 70));

        wallpaper.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/pelouse.jpg"))); // NOI18N
        getContentPane().add(wallpaper, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, -1, -1));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    /**
     *
     * Ce bouton permettre d'aller a l'ecran "Coaching"
     */
    private void CoachingActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_CoachingActionPerformed
        int myID=myTCP.getMyID();
        new TCP_CLIENT(hostIPadress,port,"invalidateCoach:"+myID).start();
        CH6 = new CH_6_Coaching(hostIPadress,port,myID,myTCP,this);
        CH6.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_CoachingActionPerformed
    

    /**
     *
     * Ce bouton permettre de lancer le match suivante sauf que si on est a la fin
     * de la phase de groups. Dans ce cas le bouton lance la fenetre Final Phase
     *
     */
    private void NextGameActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_NextGameActionPerformed
        int myID=myTCP.getMyID();
        new TCP_CLIENT(hostIPadress,port,"validateCoach:"+myID).start();
        liguapoulpe.Clock c1 = new liguapoulpe.Clock(2);
        c1.start();
        while(c1.getFlag()==false){}
        ClockMatch c = new ClockMatch(60,myTCP);
        c.start();
        while(c.getOK()==false){}
        t=myTCP.getTournament();
        System.out.println("" + t.getNumberPhase());
        if(t.getNumberPhase()<3)
        {
          CH7 = new CH_7_MATCH(hostIPadress,port,myIPadress,myTCP,this,"Phase de Groupes");
          CH7.setVisible(true);
          this.setVisible(false);
        }
        else
        {
          CH8 = new CH_8_FinalPhase(hostIPadress,port,myIPadress,myTCP);
          CH8.setVisible(true);
          if(t.getIemeCoach(myID).getTeam().isGameOver()){ CH8.setEliminated();}
          this.dispose();
        }

    }//GEN-LAST:event_NextGameActionPerformed

    /**
     *
     * Ce bouton lance l'ecran "Agenda"
     */
    private void AgendaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_AgendaActionPerformed
       if(CH5 == null){
            CH5 = new CH_5_Agenda(hostIPadress,port,myIPadress,myTCP,this);
        }
        CH5.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_AgendaActionPerformed

    /**
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */
    public void getFlag(){
        NextGame.setEnabled(false);
        Coaching.setEnabled(false);
    }

    /**
     * Cette methode sert a degriser le bouton NextGame quand on viens de l'ecran "Coaching"
     */
    public void setNext(){
        NextGame.setEnabled(true);
    }


    /**
     * Cette methode affiche les nouveaux resultats
     */
    public void setRound(){
        t=myTCP.getTournament();
        Coaching.setEnabled(true);
        if(numberOfRounds == 3){
            NextGame.setEnabled(false);
        }
        numberOfRounds++;
                
         

        for(int i = 1; i<=4;i++){
            ANameModel.set(i, t.getGroupA().getRanking()[i][0]);
            APTSModel.set(i,t.getGroupA().getRanking()[i][1]);
            AGFModel.set(i,t.getGroupA().getRanking()[i][2]);
            AGAModel.set(i,t.getGroupA().getRanking()[i][3]);
            ADIFModel.set(i,t.getGroupA().getRanking()[i][4]);
        }
        for(int i = 1; i<=4;i++){
            BNameModel.set(i, t.getGroupB().getRanking()[i][0]);
            BPTSModel.set(i,t.getGroupB().getRanking()[i][1]);
            BGFModel.set(i,t.getGroupB().getRanking()[i][2]);
            BGAModel.set(i,t.getGroupB().getRanking()[i][3]);
            BDIFModel.set(i,t.getGroupB().getRanking()[i][4]);
        }
        for(int i = 0; i<=4;i++){
            CNameModel.set(i, t.getGroupC().getRanking()[i][0]);
            CPTSModel.set(i,t.getGroupC().getRanking()[i][1]);
            CGFModel.set(i,t.getGroupC().getRanking()[i][2]);
            CGAModel.set(i,t.getGroupC().getRanking()[i][3]);
            CDIFModel.set(i,t.getGroupC().getRanking()[i][4]);
        }
        for(int i = 0; i<=4;i++){
            DNameModel.set(i, t.getGroupD().getRanking()[i][0]);
            DPTSModel.set(i,t.getGroupD().getRanking()[i][1]);
            DGFModel.set(i,t.getGroupD().getRanking()[i][2]);
            DGAModel.set(i,t.getGroupD().getRanking()[i][3]);
            DDIFModel.set(i,t.getGroupD().getRanking()[i][4]);
        }

        if(numberOfRounds <3){
            NextGame.setEnabled(false);
        }
        else{
            Coaching.setEnabled(false);
            NextGame.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/FINALPHASE.jpg")));
        }
                
    }
    

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JList A_DIF;
    private javax.swing.JList A_GA;
    private javax.swing.JList A_GF;
    private javax.swing.JList A_NameList;
    private javax.swing.JList A_PTS;
    private javax.swing.JButton Agenda;
    private javax.swing.JList B_DIF;
    private javax.swing.JList B_GA;
    private javax.swing.JList B_GF;
    private javax.swing.JList B_NameList;
    private javax.swing.JList B_PTS;
    private javax.swing.JList C_DIF;
    private javax.swing.JList C_GA;
    private javax.swing.JList C_GF;
    private javax.swing.JList C_NameList;
    private javax.swing.JList C_PTS;
    public javax.swing.JButton Coaching;
    private javax.swing.JList D_DIF;
    private javax.swing.JList D_GA;
    private javax.swing.JList D_GF;
    private javax.swing.JList D_NameList;
    private javax.swing.JList D_PTS;
    private javax.swing.JLabel GroupA;
    private javax.swing.JLabel GroupB;
    private javax.swing.JLabel GroupC;
    private javax.swing.JLabel GroupD;
    private javax.swing.JButton NextGame;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane10;
    private javax.swing.JScrollPane jScrollPane11;
    private javax.swing.JScrollPane jScrollPane12;
    private javax.swing.JScrollPane jScrollPane13;
    private javax.swing.JScrollPane jScrollPane14;
    private javax.swing.JScrollPane jScrollPane15;
    private javax.swing.JScrollPane jScrollPane16;
    private javax.swing.JScrollPane jScrollPane17;
    private javax.swing.JScrollPane jScrollPane18;
    private javax.swing.JScrollPane jScrollPane19;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane20;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JScrollPane jScrollPane4;
    private javax.swing.JScrollPane jScrollPane5;
    private javax.swing.JScrollPane jScrollPane6;
    private javax.swing.JScrollPane jScrollPane7;
    private javax.swing.JScrollPane jScrollPane8;
    private javax.swing.JScrollPane jScrollPane9;
    private javax.swing.JLabel wallpaper;
    // End of variables declaration//GEN-END:variables

}

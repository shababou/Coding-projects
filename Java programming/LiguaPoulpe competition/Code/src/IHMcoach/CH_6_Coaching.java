
package IHMcoach;
import IHMParieur.Graphe;
import Reseaux.*;
import liguapoulpe.*;

import javax.swing.DefaultListModel;

/**
 *
 * Cette classe affiche l'ecran du "Coiching" ou on peut faire les reglages du team
 * @author Gus
 */
public class CH_6_Coaching extends javax.swing.JFrame {


    CH_8_FinalPhase CH8;
    CH_4_TournoiPremierePhase CH4;
    Tournament t;
    int nc;


    int controlmoral = -1; // variable de control
    boolean controlTraining = false; //variable de control
    boolean returnControl1; //variable de control
    boolean returnControl2; // variable de control

    int [] Training = new int[5];

    // Variables de reseau
    private String hostIPadress;
    private int myID;
    private int port;
    TCP_SERVER myTCP;


    private Graphe graphique;

    //Models
    DefaultListModel CommentairesModel = new DefaultListModel();


    /**
    /////////////////////////////CONSTRUCTEUR SI ON VIENT/////////////////////
    //////////////////////////DE LA PREMIERE PHASE///////////////////////////
    */
    public CH_6_Coaching(String hostIPadress,int port,int myID,TCP_SERVER myTCP,CH_4_TournoiPremierePhase CH4) {
        super("Coaching");
        
        this.setSize(800, 600);
        this.setResizable(false);
        this.CH4 = CH4;

        this.hostIPadress=hostIPadress;
        this.myTCP=myTCP;
        this.myID=myID;
        this.port=port;

        this.t=myTCP.getTournament();
        this.nc = myTCP.getMyID();
        initComponents();

        //Affiche Happiness et le nom du prochain match
        HappinessField.setText(String.valueOf(t.getIemeCoach(nc).getTeam().getHappiness()));
        NextMatchField.setText(t.getIemeCoach(nc).getTeam().getNextConcurrent().getName());

 
        /////////////////////////////MODELS////////////////////////////////////////////
        CommentairesModel.addElement("Commentaires");
        CommentairesModel.addElement("-------");
        
        for(int i=0;i<5;i++){
            System.out.println(""+ t.getIemeCoach(nc).getTeam().getComments()[i][0]);
            CommentairesModel.addElement(t.getIemeCoach(nc).getTeam().getComments()[i][0]);
            CommentairesModel.addElement("---------");
            
            
        }

        
    }

    /**
    ////////////////////////////CONSTRUCTEUR SI ON VIENT DE LA//////////////////////////
    ///////////////////////////PHASE FINALE//////////////////////////////////////////////
    */
    public CH_6_Coaching(String hostIPadress,int port,int myID,TCP_SERVER myTCP,CH_8_FinalPhase CH8) {
        super("Coaching");
        this.t=myTCP.getTournament();
        
        this.setSize(800, 600);
        this.setResizable(false);
        this.CH8 = CH8;
        this.hostIPadress=hostIPadress;
        this.myTCP=myTCP;
        this.myID=myID;
        this.port=port;
        
        
        this.nc = myTCP.getMyID();
        initComponents();

        //Affiche Happiness et le nom du prochain match
        HappinessField.setText(String.valueOf(t.getIemeCoach(nc).getTeam().getHappiness()));
        NextMatchField.setText(t.getIemeCoach(nc).getTeam().getNextConcurrent().getName());

        /////////////////////////////MODELS////////////////////////////////////////////
        CommentairesModel.addElement("Commentaires");
        CommentairesModel.addElement("-----");
        
        
        for(int i=0;i<5;i++){
            System.out.println(""+ t.getIemeCoach(nc).getTeam().getComments()[i][0]);
            CommentairesModel.addElement(t.getIemeCoach(nc).getTeam().getComments()[i][0]);
            CommentairesModel.addElement("------------");
            
        }

    }


    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        buttonGroup1 = new javax.swing.ButtonGroup();
        buttonGroup2 = new javax.swing.ButtonGroup();
        OkMoral = new javax.swing.JButton();
        HappinessField = new javax.swing.JTextField();
        Happiness = new javax.swing.JTextField();
        COMMENTS = new javax.swing.JTextField();
        Comment1 = new javax.swing.JRadioButton();
        Comment2 = new javax.swing.JRadioButton();
        Comment3 = new javax.swing.JRadioButton();
        Comment4 = new javax.swing.JRadioButton();
        Comment5 = new javax.swing.JRadioButton();
        TRAINING = new javax.swing.JTextField();
        Speed = new javax.swing.JRadioButton();
        Collective = new javax.swing.JRadioButton();
        Defense = new javax.swing.JRadioButton();
        Middle = new javax.swing.JRadioButton();
        Attack = new javax.swing.JRadioButton();
        jScrollPane2 = new javax.swing.JScrollPane();
        CommentairesList = new javax.swing.JList(CommentairesModel);
        NextMatch = new javax.swing.JTextField();
        NextMatchField = new javax.swing.JTextField();
        OkTraining = new javax.swing.JButton();
        Return = new javax.swing.JButton();
        Graphique = new javax.swing.JLabel();
        SoccerGoal = new javax.swing.JLabel();
        Coaching = new javax.swing.JLabel();
        wallpaper = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        OkMoral.setText("OK - Comments");
        OkMoral.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                OkMoralActionPerformed(evt);
            }
        });
        getContentPane().add(OkMoral, new org.netbeans.lib.awtextra.AbsoluteConstraints(630, 540, -1, -1));

        HappinessField.setEditable(false);
        HappinessField.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        getContentPane().add(HappinessField, new org.netbeans.lib.awtextra.AbsoluteConstraints(600, 180, 160, 40));

        Happiness.setEditable(false);
        Happiness.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        Happiness.setText("HAPPINESS");
        Happiness.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HappinessActionPerformed(evt);
            }
        });
        getContentPane().add(Happiness, new org.netbeans.lib.awtextra.AbsoluteConstraints(630, 140, 110, 40));

        COMMENTS.setEditable(false);
        COMMENTS.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        COMMENTS.setText("COMMENTS");
        getContentPane().add(COMMENTS, new org.netbeans.lib.awtextra.AbsoluteConstraints(640, 270, -1, -1));

        buttonGroup2.add(Comment1);
        Comment1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Comment1ActionPerformed(evt);
            }
        });
        getContentPane().add(Comment1, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 340, 30, 30));

        buttonGroup2.add(Comment2);
        Comment2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Comment2ActionPerformed(evt);
            }
        });
        getContentPane().add(Comment2, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 370, 30, 30));

        buttonGroup2.add(Comment3);
        Comment3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Comment3ActionPerformed(evt);
            }
        });
        getContentPane().add(Comment3, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 400, 30, 30));

        buttonGroup2.add(Comment4);
        Comment4.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Comment4ActionPerformed(evt);
            }
        });
        getContentPane().add(Comment4, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 430, 30, 30));

        buttonGroup2.add(Comment5);
        Comment5.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Comment5ActionPerformed(evt);
            }
        });
        getContentPane().add(Comment5, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 460, 30, 30));

        TRAINING.setEditable(false);
        TRAINING.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        TRAINING.setText("TRAINING");
        TRAINING.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                TRAININGActionPerformed(evt);
            }
        });
        getContentPane().add(TRAINING, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 310, -1, -1));

        buttonGroup1.add(Speed);
        Speed.setText("Defense");
        Speed.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                SpeedActionPerformed(evt);
            }
        });
        getContentPane().add(Speed, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 420, 110, 30));

        buttonGroup1.add(Collective);
        Collective.setText("Collective");
        Collective.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                CollectiveActionPerformed(evt);
            }
        });
        getContentPane().add(Collective, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 450, 110, 30));

        buttonGroup1.add(Defense);
        Defense.setText("Speed");
        Defense.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                DefenseActionPerformed(evt);
            }
        });
        getContentPane().add(Defense, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 480, 110, 30));

        buttonGroup1.add(Middle);
        Middle.setText("Middle");
        Middle.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                MiddleActionPerformed(evt);
            }
        });
        getContentPane().add(Middle, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 390, 110, 30));

        buttonGroup1.add(Attack);
        Attack.setText("Attack");
        Attack.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                AttackActionPerformed(evt);
            }
        });
        getContentPane().add(Attack, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 360, 110, 30));

        CommentairesList.setFont(new java.awt.Font("Comic Sans MS", 1, 12)); // NOI18N
        jScrollPane2.setViewportView(CommentairesList);

        getContentPane().add(jScrollPane2, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 300, 220, 230));

        NextMatch.setEditable(false);
        NextMatch.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        NextMatch.setText("NEXT MATCH");
        NextMatch.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                NextMatchActionPerformed(evt);
            }
        });
        getContentPane().add(NextMatch, new org.netbeans.lib.awtextra.AbsoluteConstraints(300, 140, 110, 40));

        NextMatchField.setEditable(false);
        NextMatchField.setFont(new java.awt.Font("Comic Sans MS", 1, 14)); // NOI18N
        getContentPane().add(NextMatchField, new org.netbeans.lib.awtextra.AbsoluteConstraints(280, 180, 160, 40));

        OkTraining.setText("OK - Training");
        OkTraining.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                OkTrainingActionPerformed(evt);
            }
        });
        getContentPane().add(OkTraining, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 540, -1, -1));

        Return.setEnabled(false);
        Return.setText("Return");
        Return.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                ReturnActionPerformed(evt);
            }
        });
        getContentPane().add(Return, new org.netbeans.lib.awtextra.AbsoluteConstraints(310, 550, 120, -1));

        // Création du graphe de compétences de l'équipe
        int[] capacities = new int[5];
        capacities[0] = myTCP.getTournament().getIemeCoach(myID).getTeam().getAtt();
        capacities[1] = myTCP.getTournament().getIemeCoach(myID).getTeam().getMid();
        capacities[2] = myTCP.getTournament().getIemeCoach(myID).getTeam().getDef();
        capacities[3] = myTCP.getTournament().getIemeCoach(myID).getTeam().getCol();
        capacities[4] = myTCP.getTournament().getIemeCoach(myID).getTeam().getSpd();
        graphique = new Graphe(capacities[0],capacities[1],capacities[2],capacities[3],capacities[4],275,310,250);
        graphique.setBounds(300,300,250,250);
        graphique.setOpaque(true);
        graphique.setVisible(true);
        Graphique.add(graphique);
        getContentPane().add(Graphique, new org.netbeans.lib.awtextra.AbsoluteConstraints(170, 270, 300, 240));

        SoccerGoal.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/Soccer-Goal-128.png")));
        getContentPane().add(SoccerGoal, new org.netbeans.lib.awtextra.AbsoluteConstraints(80, 130, 130, 110));

        Coaching.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/Coaching.jpg")));
        getContentPane().add(Coaching, new org.netbeans.lib.awtextra.AbsoluteConstraints(270, 20, -1, -1));

        wallpaper.setIcon(new javax.swing.ImageIcon(getClass().getResource("/IHMcoach/pelouse.jpg")));
        getContentPane().add(wallpaper, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 800, 600));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    /**
     *
     * Si on clique sur le quatrieme commentaire
     */
    private void Comment4ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Comment4ActionPerformed
        controlmoral = 3;
    }//GEN-LAST:event_Comment4ActionPerformed

    /**
     *
     * On enregistre l'option choisit
     */
    private void OkMoralActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_OkMoralActionPerformed
        if(controlmoral != -1){
            t.getIemeCoach(nc).getTeam().comToHap(String.valueOf(controlmoral));
            OkMoral.setEnabled(false);
            returnControl2 = true;
            if(returnControl1){Return.setEnabled(true);}
            
        }
    }//GEN-LAST:event_OkMoralActionPerformed

    private void TRAININGActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_TRAININGActionPerformed
        
    }//GEN-LAST:event_TRAININGActionPerformed

    private void HappinessActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HappinessActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_HappinessActionPerformed

    private void NextMatchActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_NextMatchActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_NextMatchActionPerformed

    /**
     *
     * Si on clique sur le premier commentaire
     */
    private void Comment1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Comment1ActionPerformed
        controlmoral = 0;
    }//GEN-LAST:event_Comment1ActionPerformed

    /**
     *
     * Si on clique sur le deuxieme commentaire
     */
    private void Comment2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Comment2ActionPerformed
        controlmoral = 1;
    }//GEN-LAST:event_Comment2ActionPerformed

    /**
     *
     * Si on clique sur le troisieme commentaire
     */
    private void Comment3ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Comment3ActionPerformed
        controlmoral = 2;
    }//GEN-LAST:event_Comment3ActionPerformed

    /**
     *
     * Si on clique sur le cinquieme commentaire
     */
    private void Comment5ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Comment5ActionPerformed
        controlmoral = 4;
    }//GEN-LAST:event_Comment5ActionPerformed

    /**
     * Ce bouton enregistre le training choisit
     * @param evt
     */
    private void OkTrainingActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_OkTrainingActionPerformed
        if(controlTraining){
            t.getIemeCoach(nc).getTeam().setTraining(Training);
            OkTraining.setEnabled(false);
            returnControl1 = true;
            if(returnControl2){Return.setEnabled(true);}

        }
        
    }//GEN-LAST:event_OkTrainingActionPerformed

    /**
     *
     * Ce bouton retourne sur la phase finale ou sur la premiere phase
     */
    private void ReturnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_ReturnActionPerformed
        if(CH4 != null){
            int myID=myTCP.getMyID();
            //new TCP_CLIENT(hostIPadress,port,"validateCoach:"+myID).start();

            CH4.setVisible(true);
            CH4.getFlag();
            
            CH4.setNext();
            this.dispose();
                    
        }
        else{
            CH8.setVisible(true);
            CH8.getFlag();
            this.dispose();
        }
        
 
    }//GEN-LAST:event_ReturnActionPerformed

    /**
     *
     * Si on clique sur defense
     */
    private void DefenseActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_DefenseActionPerformed
        controlTraining = true;
        for(int i=0;i<5;i++){
            Training[i] = 10;
        }
        Training[2] = 60;
}//GEN-LAST:event_DefenseActionPerformed

    /**
     *
     * Si on clique sur collective
     */
    private void CollectiveActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_CollectiveActionPerformed
        controlTraining = true;
        for(int i=0;i<5;i++){
            Training[i] = 10;
        }
        Training[3] = 60;
}//GEN-LAST:event_CollectiveActionPerformed

    /**
     *
     * Si on clique sur speed
     */
    private void SpeedActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_SpeedActionPerformed
        controlTraining = true;
        for(int i=0;i<5;i++){
            Training[i] = 10;
        }
        Training[4] = 60;
}//GEN-LAST:event_SpeedActionPerformed


    /**
     *
     * Si on clique sur defense
     */
    private void MiddleActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_MiddleActionPerformed
        controlTraining = true;
        for(int i=0;i<5;i++){
            Training[i] = 10;
        }
        Training[1] = 60;
}//GEN-LAST:event_MiddleActionPerformed

    /**
     *
     * Si on clique sur attack
     */
    private void AttackActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_AttackActionPerformed
        controlTraining = true;

        for(int i=0;i<5;i++){
            Training[i] = 10;
        }
        Training[0] = 60;
}//GEN-LAST:event_AttackActionPerformed



    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JRadioButton Attack;
    private javax.swing.JTextField COMMENTS;
    private javax.swing.JLabel Coaching;
    private javax.swing.JRadioButton Collective;
    private javax.swing.JRadioButton Comment1;
    private javax.swing.JRadioButton Comment2;
    private javax.swing.JRadioButton Comment3;
    private javax.swing.JRadioButton Comment4;
    private javax.swing.JRadioButton Comment5;
    private javax.swing.JList CommentairesList;
    private javax.swing.JRadioButton Defense;
    private javax.swing.JLabel Graphique;
    private javax.swing.JTextField Happiness;
    private javax.swing.JTextField HappinessField;
    private javax.swing.JRadioButton Middle;
    private javax.swing.JTextField NextMatch;
    private javax.swing.JTextField NextMatchField;
    private javax.swing.JButton OkMoral;
    private javax.swing.JButton OkTraining;
    private javax.swing.JButton Return;
    private javax.swing.JLabel SoccerGoal;
    private javax.swing.JRadioButton Speed;
    private javax.swing.JTextField TRAINING;
    private javax.swing.ButtonGroup buttonGroup1;
    private javax.swing.ButtonGroup buttonGroup2;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JLabel wallpaper;
    // End of variables declaration//GEN-END:variables

}

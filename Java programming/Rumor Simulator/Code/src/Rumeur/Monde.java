/*
 * Monde.java
 *
 * Created on 21 mai 2011, 23:11
 */

package Rumeur;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 *
 * @author  Simon
 */
public class Monde extends javax.swing.JFrame {
    
    Database data = new Database();
    Horloge h;
    Graphics g;
    private int rond = 6;
    /** Creates new form Monde */
    ArrayList<Individu> population = new ArrayList<Individu>();
    ArrayList<ArrayList<Individu>> amis = new ArrayList<ArrayList<Individu>>();
    private int taille;
    private int utilite;
    private int contactes;
    private int previousContactes;
    private int mode;
    private int nbAmis;
    private int rayon;
    
    private ArrayList<String> donnees = new ArrayList<String>();
    private double[] Xiter;
    private double[] Ycontactes;
    private double[] Yadheres;
    private double demiVie;
    private boolean check = false;
    
    public Monde() 
    {
        super("SIMULATEUR DE PROPAGATION");
        initComponents();
        choice1.addItem("Les individus ont tous un même nombre de proches voisins égal à :");
        choice1.addItem("Les individus ont des voisins dans un rayon égal à :");
        choice1.addItem("Les individus ont tous un même nombre de voisins partout égal à :");
        choice1.addItem("Combiné : rayon de voisinage ; nombre de voisins :");
        g = jPanel1.getGraphics();
        jButton5.setEnabled(false);
        jButton6.setEnabled(false);
        jButton2.setEnabled(false);
        jButton3.setEnabled(false);
    }
    
    public ArrayList<Individu> getAmis(int ind){return amis.get(ind);}
    
    private void prepareAffichage()
    {
        g.setColor(Color.GREEN);
        for(int i=0;i<taille;i++) g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
    }
    private void afficherContactes()
    {
        for(int i=0;i<contactes;i++) 
        {
            g.setColor(Color.BLACK);
            g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
        }
        g.setColor(Color.GREEN);
        for(int i=contactes;i<taille;i++) g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
    }
    private void initialiserAffichage()
    {
        for(int i=0;i<contactes;i++) 
        {
            if(population.get(i).getOpinion()==1)
            {
                g.setColor(Color.RED);
                g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
                choice2.addItem( String.valueOf(population.get(i).getIndice()) );
            } 
        }
    }
    private void afficherAmis()
    {
        int select = Integer.parseInt(choice2.getSelectedItem());
        population.get(select).sactive();
        for(int i=0;i<getAmis(select).size();i++) 
        {
            g.setColor(Color.BLUE);
            g.fillOval(getAmis(select).get(i).getX(),getAmis(select).get(i).getY(), rond, rond);
        }
    }
    public void affichage()
    {
        int nbAdheres = 0;
        int nbContactes = 0;
        for(int i=0;i<taille;i++) 
        {
            if(population.get(i).fait) nbContactes++; 
            if(population.get(i).getOpinion()==-1)
            {
                if(population.get(i).estActif()) 
                {
                    g.setColor(Color.BLUE);
                    g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
                }
                else
                {
                    g.setColor(Color.GREEN);
                    g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
                }
            }
            else
            {
                if(population.get(i).estActif()) 
                {
                    g.setColor(Color.ORANGE);
                    g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
                }
                else
                {
                    g.setColor(Color.RED);
                    g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
                }
            nbAdheres++;
            }
        }
        if( (check==false)&&(nbContactes > taille/2.) )
        {
            demiVie = h.current*0.2;
            check=true;
        }
        if(nbContactes > previousContactes) data.ecrire( String.valueOf(nbAdheres)+":"+String.valueOf(nbContactes)+":"+String.valueOf(h.current*0.2) );
        previousContactes = nbContactes;
    }
    private void affichageFinal()
    {
        for(int i=0;i<taille;i++) 
        {
            if( population.get(i).getOpinion()==1 )
            {
                g.setColor(Color.RED);
                g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
            }
            else
            {
                if( population.get(i).fait )
                {
                    if( population.get(i).diffuse )
                    {
                        g.setColor(Color.BLUE);
                        g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
                    }
                    else
                    {
                        g.setColor(Color.BLACK);
                        g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
                    }
                }
                else
                {
                    g.setColor(Color.GREEN);
                    g.fillOval(population.get(i).getX(),population.get(i).getY(), rond, rond);
                }
            }
        }
    }
    
    public void setAmis(int i)
    {
        amis.add(i,population.get(i).setAmis(mode,population));
    }
    
    public javax.swing.JPanel getPanel(){return jPanel1;} 
    
    /** This method is called from within the constructor to
     * initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is
     * always regenerated by the Form Editor.
     */
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel3 = new javax.swing.JPanel();
        jButton1 = new javax.swing.JButton();
        jLabel1 = new javax.swing.JLabel();
        jTextField1 = new javax.swing.JTextField();
        jLabel2 = new javax.swing.JLabel();
        jTextField2 = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        jTextField3 = new javax.swing.JTextField();
        choice1 = new java.awt.Choice();
        jTextField4 = new javax.swing.JTextField();
        jTextField5 = new javax.swing.JTextField();
        jButton5 = new javax.swing.JButton();
        jLabel4 = new javax.swing.JLabel();
        choice2 = new java.awt.Choice();
        jButton3 = new javax.swing.JButton();
        jButton6 = new javax.swing.JButton();
        jButton2 = new javax.swing.JButton();
        jPanel2 = new javax.swing.JPanel();
        jPanel1 = new javax.swing.JPanel();
        textField1 = new java.awt.TextField();
        textField2 = new java.awt.TextField();
        jLabel5 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        jLabel8 = new javax.swing.JLabel();
        textField3 = new java.awt.TextField();
        textField4 = new java.awt.TextField();
        jLabel9 = new javax.swing.JLabel();
        jLabel10 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setBackground(new java.awt.Color(0, 0, 0));
        setForeground(new java.awt.Color(0, 0, 0));

        jPanel3.setBackground(new java.awt.Color(51, 51, 51));

        jButton1.setBackground(new java.awt.Color(0, 0, 0));
        jButton1.setFont(new java.awt.Font("Arial", 1, 14));
        jButton1.setForeground(new java.awt.Color(0, 204, 0));
        jButton1.setText("PREPARER");
        jButton1.setBorder(new javax.swing.border.MatteBorder(null));
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        jLabel1.setBackground(new java.awt.Color(51, 51, 51));
        jLabel1.setFont(new java.awt.Font("OCR A Extended", 1, 18));
        jLabel1.setForeground(new java.awt.Color(51, 255, 51));
        jLabel1.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel1.setText("Population");
        jLabel1.setOpaque(true);

        jTextField1.setBackground(new java.awt.Color(51, 51, 51));
        jTextField1.setFont(new java.awt.Font("OCR A Extended", 0, 18));
        jTextField1.setForeground(new java.awt.Color(0, 255, 255));
        jTextField1.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        jTextField1.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(255, 255, 255)));
        jTextField1.setScrollOffset(1);
        jTextField1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jTextField1ActionPerformed(evt);
            }
        });

        jLabel2.setBackground(new java.awt.Color(51, 51, 51));
        jLabel2.setFont(new java.awt.Font("OCR A Extended", 1, 18));
        jLabel2.setForeground(new java.awt.Color(51, 255, 51));
        jLabel2.setText("Utilité de la rumeur ");
        jLabel2.setOpaque(true);

        jTextField2.setBackground(new java.awt.Color(51, 51, 51));
        jTextField2.setFont(new java.awt.Font("OCR A Extended", 0, 18));
        jTextField2.setForeground(new java.awt.Color(0, 255, 255));
        jTextField2.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        jTextField2.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(255, 255, 255)));

        jLabel3.setBackground(new java.awt.Color(51, 51, 51));
        jLabel3.setFont(new java.awt.Font("OCR A Extended", 1, 18));
        jLabel3.setForeground(new java.awt.Color(51, 255, 51));
        jLabel3.setText("Nombre de contactés");
        jLabel3.setOpaque(true);

        jTextField3.setBackground(new java.awt.Color(51, 51, 51));
        jTextField3.setFont(new java.awt.Font("OCR A Extended", 0, 18));
        jTextField3.setForeground(new java.awt.Color(0, 255, 255));
        jTextField3.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        jTextField3.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(255, 255, 255)));

        choice1.setBackground(new java.awt.Color(204, 204, 204));
        choice1.setFont(new java.awt.Font("OCR A Extended", 0, 14));
        choice1.setForeground(new java.awt.Color(0, 153, 153));

        jTextField4.setBackground(new java.awt.Color(51, 51, 51));
        jTextField4.setFont(new java.awt.Font("OCR A Extended", 0, 18));
        jTextField4.setForeground(new java.awt.Color(0, 255, 255));
        jTextField4.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        jTextField4.setBorder(javax.swing.BorderFactory.createMatteBorder(1, 1, 1, 1, new java.awt.Color(255, 255, 255)));

        jTextField5.setBackground(new java.awt.Color(51, 51, 51));
        jTextField5.setFont(new java.awt.Font("OCR A Extended", 0, 18));
        jTextField5.setForeground(new java.awt.Color(0, 255, 255));
        jTextField5.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        jTextField5.setBorder(javax.swing.BorderFactory.createMatteBorder(1, 1, 1, 1, new java.awt.Color(255, 255, 255)));

        jButton5.setBackground(new java.awt.Color(0, 0, 0));
        jButton5.setFont(new java.awt.Font("Arial", 1, 14));
        jButton5.setForeground(new java.awt.Color(0, 204, 0));
        jButton5.setText("INITIER");
        jButton5.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton5ActionPerformed(evt);
            }
        });

        jLabel4.setBackground(new java.awt.Color(51, 51, 51));
        jLabel4.setFont(new java.awt.Font("OCR A Extended", 1, 18));
        jLabel4.setForeground(new java.awt.Color(51, 255, 51));
        jLabel4.setText("Suivre le numéro");
        jLabel4.setOpaque(true);

        choice2.setBackground(new java.awt.Color(204, 204, 204));
        choice2.setFont(new java.awt.Font("OCR A Extended", 0, 12));
        choice2.setForeground(new java.awt.Color(0, 102, 102));

        jButton3.setBackground(new java.awt.Color(0, 0, 0));
        jButton3.setFont(new java.awt.Font("Arial", 1, 14));
        jButton3.setForeground(new java.awt.Color(0, 153, 0));
        jButton3.setText("OK");
        jButton3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton3ActionPerformed(evt);
            }
        });

        jButton6.setFont(new java.awt.Font("Tahoma", 1, 14));
        jButton6.setIcon(new javax.swing.ImageIcon("C:\\Users\\Simon\\Desktop\\PIP\\Rumeurr\\simuler.jpg")); // NOI18N
        jButton6.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED, null, new java.awt.Color(51, 255, 51), null, null));
        jButton6.setHorizontalTextPosition(javax.swing.SwingConstants.CENTER);
        jButton6.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton6ActionPerformed(evt);
            }
        });

        jButton2.setFont(new java.awt.Font("Tahoma", 1, 12));
        jButton2.setIcon(new javax.swing.ImageIcon("C:\\Users\\Simon\\Desktop\\PIP\\Rumeurr\\resultats.jpg")); // NOI18N
        jButton2.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED, null, new java.awt.Color(51, 255, 51), null, null));
        jButton2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton2ActionPerformed(evt);
            }
        });

        jPanel2.setBackground(new java.awt.Color(102, 102, 102));
        jPanel2.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED, new java.awt.Color(0, 0, 0), new java.awt.Color(0, 0, 0), new java.awt.Color(0, 0, 0), new java.awt.Color(0, 0, 0)));

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 495, Short.MAX_VALUE)
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 296, Short.MAX_VALUE)
        );

        jPanel1.setBackground(new java.awt.Color(204, 255, 204));
        jPanel1.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED, new java.awt.Color(0, 0, 0), new java.awt.Color(0, 0, 0), new java.awt.Color(0, 0, 0), new java.awt.Color(0, 0, 0)));
        jPanel1.setForeground(new java.awt.Color(204, 255, 204));

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 530, Short.MAX_VALUE)
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 465, Short.MAX_VALUE)
        );

        textField1.setFont(new java.awt.Font("OCR A Extended", 1, 14));
        textField1.setForeground(new java.awt.Color(0, 0, 153));

        textField2.setFont(new java.awt.Font("OCR A Extended", 1, 14));
        textField2.setForeground(new java.awt.Color(204, 0, 0));

        jLabel5.setFont(new java.awt.Font("Arial Black", 1, 14));
        jLabel5.setForeground(new java.awt.Color(51, 51, 51));
        jLabel5.setText("¤ NON CONTACTES");

        jLabel6.setFont(new java.awt.Font("Arial Black", 0, 14));
        jLabel6.setForeground(new java.awt.Color(51, 51, 51));
        jLabel6.setText("¤ ADHERANTS ET DIFFUSEURS");

        jLabel7.setFont(new java.awt.Font("Arial Black", 1, 14));
        jLabel7.setForeground(new java.awt.Color(51, 51, 51));
        jLabel7.setText("¤ NON ADHERANTS MAIS DIFFUSEURS");

        jLabel8.setFont(new java.awt.Font("Arial Black", 1, 14));
        jLabel8.setForeground(new java.awt.Color(51, 51, 51));
        jLabel8.setText("¤ NON ADHERANTS NON DIFFUSEURS");

        textField4.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                textField4ActionPerformed(evt);
            }
        });

        jLabel9.setForeground(new java.awt.Color(0, 204, 0));
        jLabel9.setText("Temps de mi-population");

        jLabel10.setForeground(new java.awt.Color(0, 204, 0));
        jLabel10.setText("Temps à la fin");

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addContainerGap()
                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                    .addGroup(javax.swing.GroupLayout.Alignment.LEADING, jPanel3Layout.createSequentialGroup()
                                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addGroup(jPanel3Layout.createSequentialGroup()
                                                .addComponent(jLabel3)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(jTextField3, javax.swing.GroupLayout.PREFERRED_SIZE, 48, javax.swing.GroupLayout.PREFERRED_SIZE))
                                            .addGroup(jPanel3Layout.createSequentialGroup()
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(jLabel4)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(choice2, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addGap(18, 18, 18)
                                                .addComponent(jButton3)))
                                        .addGap(167, 167, 167)
                                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(jTextField5, javax.swing.GroupLayout.PREFERRED_SIZE, 22, javax.swing.GroupLayout.PREFERRED_SIZE)
                                            .addComponent(jTextField4, javax.swing.GroupLayout.PREFERRED_SIZE, 22, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                    .addGroup(jPanel3Layout.createSequentialGroup()
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel10)
                                    .addComponent(jLabel9)
                                    .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                        .addComponent(textField1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                        .addComponent(textField2, javax.swing.GroupLayout.DEFAULT_SIZE, 46, Short.MAX_VALUE))
                                    .addComponent(textField3, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(textField4, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGap(65, 65, 65))
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addGroup(jPanel3Layout.createSequentialGroup()
                                        .addComponent(jLabel2)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(jTextField2, javax.swing.GroupLayout.PREFERRED_SIZE, 46, javax.swing.GroupLayout.PREFERRED_SIZE))
                                    .addGroup(jPanel3Layout.createSequentialGroup()
                                        .addComponent(jLabel1)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                        .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, 58, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 151, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 358, Short.MAX_VALUE))
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel3Layout.createSequentialGroup()
                                .addComponent(choice1, javax.swing.GroupLayout.PREFERRED_SIZE, 467, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 121, Short.MAX_VALUE)
                                .addComponent(jButton5)
                                .addGap(34, 34, 34))))
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addGap(35, 35, 35)
                        .addComponent(jButton6, javax.swing.GroupLayout.PREFERRED_SIZE, 125, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(200, 200, 200)
                        .addComponent(jButton2, javax.swing.GroupLayout.PREFERRED_SIZE, 132, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)))
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addGap(82, 82, 82)
                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel7)
                            .addComponent(jLabel8)
                            .addComponent(jLabel5)
                            .addComponent(jLabel6))))
                .addContainerGap())
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                    .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, 26, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 29, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                    .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 27, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jTextField2, javax.swing.GroupLayout.PREFERRED_SIZE, 29, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGap(11, 11, 11)
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(jLabel3)
                                    .addComponent(jTextField3, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jTextField4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(choice1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jButton5))
                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addGap(27, 27, 27)
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jButton3)
                                    .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                        .addComponent(jLabel4)
                                        .addComponent(choice2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))))
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addGap(6, 6, 6)
                                .addComponent(jTextField5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 42, Short.MAX_VALUE)
                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jButton6, javax.swing.GroupLayout.PREFERRED_SIZE, 51, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jButton2, javax.swing.GroupLayout.PREFERRED_SIZE, 53, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addComponent(textField1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(textField2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(220, 220, 220)
                                .addComponent(textField3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 9, Short.MAX_VALUE))
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(16, 16, 16)
                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addComponent(jLabel6)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel7)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED))
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addComponent(jLabel9)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(textField4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 14, Short.MAX_VALUE)
                                .addComponent(jLabel10)
                                .addGap(1, 1, 1)))
                        .addComponent(jLabel8)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jLabel5)))
                .addContainerGap(15, Short.MAX_VALUE))
        );

        jTextField1.getAccessibleContext().setAccessibleParent(this);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        // TODO add your handling code here:
        taille = Integer.parseInt(jTextField1.getText());
        for(int i=0;i<taille;i++) population.add(i,new Individu(i,this));
        prepareAffichage();
        jButton5.setEnabled(true);
        jButton3.setEnabled(true);
    }//GEN-LAST:event_jButton1ActionPerformed

    private void jButton5ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton5ActionPerformed
        // TODO add your handling code here:
        utilite = Integer.parseInt(jTextField2.getText());
        for(int i=0;i<population.size();i++) population.get(i).setUtilite(utilite);
        contactes = Integer.parseInt(jTextField3.getText());
        for(int i=0;i<contactes;i++)population.get(i).sabonne();
        afficherContactes();
        Timer t = new Timer(2000);
        t.start();
        while(t.done==false){}
        mode = choice1.getSelectedIndex();
        if(mode==3) jTextField5.setEnabled(true);
        for(int i=0;i<population.size();i++)
        {
            if(mode==0||mode==2)
            {
                nbAmis = Integer.parseInt(jTextField4.getText());
                population.get(i).setNbAmis(nbAmis);
            }
            else if(mode==1)
            {
                rayon = Integer.parseInt(jTextField4.getText());
                population.get(i).setRayon(rayon);
            }
            else
            {
                nbAmis = Integer.parseInt(jTextField5.getText());
                rayon = Integer.parseInt(jTextField4.getText());
                population.get(i).setNbAmis(nbAmis);
                population.get(i).setRayon(rayon);
            }
            setAmis(i);
        } 
        for(int i=0;i<contactes;i++) population.get(i).traitement();
        initialiserAffichage();
    }//GEN-LAST:event_jButton5ActionPerformed

    private void jButton6ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton6ActionPerformed
        // TODO add your handling code here:
        h = new Horloge(200,this);
        h.start();
        for(int i=0;i<contactes;i++) 
        {
            if(population.get(i).isAlive()==false) population.get(i).start();
            population.get(i).yield();
        }
        while(h.done==false){}
        jButton2.setEnabled(true); 
    }//GEN-LAST:event_jButton6ActionPerformed

    private void jTextField1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jTextField1ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jTextField1ActionPerformed

    private void jButton3ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton3ActionPerformed
        // TODO add your handling code here:
        afficherAmis();
        jButton6.setEnabled(true);
    }//GEN-LAST:event_jButton3ActionPerformed

    private void jButton2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton2ActionPerformed
        try {
            // TODO add your handling code here:
            donnees = data.lire("Données.txt");
            Xiter = new double[donnees.size()];
            Yadheres = new double[donnees.size()];
            Ycontactes = new double[donnees.size()];
            for (int i = 0; i < donnees.size(); i++) {
                String[] str = donnees.get(i).split(":");
                Xiter[i] = Double.parseDouble(str[2]);
                Yadheres[i] = Double.parseDouble(str[0]);
                Ycontactes[i] = Double.parseDouble(str[1]);
            }
            new Courbes("Population: "+String.valueOf(taille), "ayant adhéré", "contactés", "t (en secondes)", "nombre d'individus", Xiter, Yadheres, Ycontactes);

            Image image = ImageIO.read(new File("chart.jpg"));
            jPanel2.getGraphics().drawImage(image, 0, 1, null);
        }
        catch (IOException ex) 
        {
            Logger.getLogger(Monde.class.getName()).log(Level.SEVERE, null, ex);
        }
        textField1.setText( String.valueOf(Ycontactes[Ycontactes.length-1]) );
        textField2.setText( String.valueOf(Yadheres[Yadheres.length-1]) );
        textField3.setText( String.valueOf(Xiter[Xiter.length-1]) );
        if(demiVie==0) textField4.setText( "null" );
        else textField4.setText( String.valueOf(demiVie) );
        jLabel6.setForeground(new java.awt.Color(255, 0, 0)); jLabel6.setText("¤ ADHERANTS");
        jLabel7.setForeground(new java.awt.Color(51, 51, 255)); jLabel7.setText("¤ NON ADHERANTS MAIS DIFFUSEURS");
        jLabel8.setForeground(new java.awt.Color(0, 0, 0)); jLabel8.setText("¤ NON ADHERANTS NON DIFFUSEURS");
        jLabel5.setForeground(new java.awt.Color(0, 255, 0)); jLabel5.setText("¤ NON CONTACTES");
        affichageFinal();
    }//GEN-LAST:event_jButton2ActionPerformed

    private void textField4ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_textField4ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_textField4ActionPerformed
    
    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Monde().setVisible(true);
            }
        });
    }
    
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private java.awt.Choice choice1;
    private java.awt.Choice choice2;
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton2;
    private javax.swing.JButton jButton3;
    private javax.swing.JButton jButton5;
    private javax.swing.JButton jButton6;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JTextField jTextField2;
    private javax.swing.JTextField jTextField3;
    private javax.swing.JTextField jTextField4;
    private javax.swing.JTextField jTextField5;
    private java.awt.TextField textField1;
    private java.awt.TextField textField2;
    private java.awt.TextField textField3;
    private java.awt.TextField textField4;
    // End of variables declaration//GEN-END:variables
    
}

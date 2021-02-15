package IHMParieur;


import DataJoueur.PlayerDataParieur;
import Reseaux.*;
import liguapoulpe.Tournament;

import java.awt.BorderLayout;
import java.awt.Color;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JRadioButton;
import javax.swing.JTextField;


/**
 * L'écran de validation sert au parieur pour miser sur le match qu'il a sélectionné.
 */

public class EcranValidation extends JFrame
{
    // Pour communiquer avec le serveur
    private PlayerDataParieur dataP;
    private TCP_SERVER server;
    private String IPserver;
    private int port;

    private String equipeA,equipeB;
    private int numMatch;


    // Pour l'architecture de la fenêtre
    public String pathImage ;

    private JLayeredPane layer0 ;
    private LabelOutils titre;
    private JRadioButton choix1,choix2,choix3;
    private JTextField mise;
    private Bouton ok;
    private JLabel background;


/**
  * Le constructeur (avec en paramètre le nom de l'équipe A et de l'équipe B)
  */
    public EcranValidation(PlayerDataParieur _dataP,int _numMatch,String _equipeA,String _equipeB)
	{
                dataP = _dataP;
                IPserver = dataP.getIPserver();
                port = dataP.getPort();
                server = dataP.getServer();
                dataP.setT(server.getTournament());

                numMatch=_numMatch;
                equipeA = _equipeA;
                equipeB = _equipeB;

                
		addWindowListener(new WindowAdapter()
                {
                @Override
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});

                //Définit le titre de la fenêtre.
                this.setTitle("Validation du paris");
                //Définit la taille de la fenêtre.
                this.setSize(400, 300);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);
	}



/**
* On construit le fond d'écran avec les composants (boutons et titres)
*/
	void addBackgroundV()
	{
                layer0 = new JLayeredPane();

		// Pour le fond d'écran
		background = new JLabel ();
		background.setBounds (0,0,400,300) ;
		background.setOpaque(true);
                background.setBackground(Color.blue);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);

                // Pour le titre
                titre = new LabelOutils(20,20,360,50);
                titre.addMessage((equipeA +" vs "+equipeB), "Arial", 25, Color.yellow);

		

                // Pour les choix
                choix1 = new JRadioButton(equipeA);
                choix1.setBounds(80,100,100,30);
                choix2 = new JRadioButton(equipeB);
                choix2.setBounds(80,130,100,30);
                choix3 = new JRadioButton("Match nul");
                choix3.setBounds(80,160,100,30);

                
                 // Pour inscrire la mise
                mise = new JTextField();
                mise.setBackground(Color.yellow);
                mise.setBounds(250,120,80,40);

                // Pour le bouton
                ok = new Bouton (300,230,80,30);
                ok.setText("Valider");
                ok.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("ok");

                            // Pari sur Equipe A
                            if ((choix1.isSelected()==true)&&(choix2.isSelected()==false)&&(choix3.isSelected()==false))
                            {
                                int numPunter = dataP.getNumPunter();
                                int res = 1;
                                String message = "miser" +":"+ String.valueOf(numPunter)+":"+ String.valueOf(numMatch)+":"+ String.valueOf(res)+":" + mise.getText();
                                new TCP_CLIENT(IPserver,port,message).start() ;

                                System.out.println(message);
                                setVisible(false);
                            }
                            // Pari sur Equipe B
                            else if ((choix2.isSelected()==true)&&(choix1.isSelected()==false)&&(choix3.isSelected()==false))
                            {
                                int numPunter = dataP.getNumPunter();
                                int res = -1;
                                String message = "miser:"+ String.valueOf(numPunter)+":"+ String.valueOf(numMatch)+":"+ String.valueOf(res)+":" + mise.getText();
                                new TCP_CLIENT(IPserver,port,message).start() ;

                                System.out.println(message);
                                setVisible(false);
                            }
                            // Pari sur Match nul
                            else if ((choix3.isSelected()==true)&&(choix1.isSelected()==false)&&(choix2.isSelected()==false))
                            {
                                int numPunter = dataP.getNumPunter();
                                int res = 0;
                                String message = "miser:"+ String.valueOf(numPunter)+":"+ String.valueOf(numMatch)+":"+ String.valueOf(res)+":" + mise.getText();
                                new TCP_CLIENT(IPserver,port,message).start() ;

                               
                                System.out.println(message);
                                setVisible(false);
                            }

                            

                            Ecran3 e = new Ecran3(dataP);
                            e.addBackground3();
                            e.setVisible(true);
                           
                     }
                 });

                
               


		// On ajoute les composants
		layer0.add (titre,new Integer (1));
		layer0.add (ok,new Integer (1));
                layer0.add (choix1,new Integer (1));
                layer0.add (choix2,new Integer (1));
                layer0.add (choix3,new Integer (1));
                layer0.add (mise,new Integer (1));

	}
}


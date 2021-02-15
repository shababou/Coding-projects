/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Reseaux;
import liguapoulpe.*;
import java.net.*;
import java.io.*;
import java.util.ArrayList;

public class TCP_SERVER extends Thread
{
  ServerSocket reception;
  int port;
  Tournament t;
  ArrayList<String> listIPadress = new ArrayList<String>();
  int n=0;// Index for players
  int nc=0;// Index for coachs
  int np=0;// Index for punters
  int myID;
  String IP;
  int r;
  boolean forb=false;

  public TCP_SERVER(String IP, int port,Tournament t)
  {
    this.IP = IP;
    this.port=port;
    this.t=t;
    try
    {
      reception=new ServerSocket(port);
      System.out.println("Server's listening on "+port);
    }
    catch(IOException e) 
    {
      System.err.println("Could not listen on port "+port);
      System.exit(1);
    }
  }

    @Override
  public void run()
  {
    Socket sock=null;
    try
    {
      while(true)
      {
        sock=reception.accept();
        new ServerThread(IP,sock,this,port,t).start();
      }
    }
    catch(IOException e) { }
  }

  public void setTournament(Tournament t){this.t=t;}
  
  public Tournament getTournament(){return t;}

  public void setMyID(int ID){myID=ID;}

  public void setListIPadress(ArrayList<String> listIPadress){this.listIPadress=listIPadress;}

  public void setn(int n){this.n=n;}

  public void setnc(int nc){this.nc=nc;}

  public void setnp(int np){this.np=np;}

  public void isForbidden(boolean forb){this.forb=forb;}

  public int getMyID(){return myID;}

  public void setNumberOfCoachs(int nc){this.nc=nc;}

  public int getNumberOfCoachs(){return nc;}

  public void nextPhase(int r)  {this.r=r;}

  public int getPhase() {return this.r;}

  public ArrayList<String> getListIPadress(){return listIPadress;}

  public int getn(){return n;}

  public int getnc(){return nc;}

  public int getnp(){return np;}

  public boolean getForbidden(){return forb;}



  
}
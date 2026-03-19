import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Array "mo:core/Array";

actor {
  let seedNotifications = List.fromArray<{
    title : Text;
    message : Text;
    date : Time.Time;
    category : Text;
  }>([
    {
      title = "सड़क निर्माण की सूचना - Road Construction Alert";
      message = "गांव में रोड निर्माण के कारण कुछ रास्ते बंद रहेंगे।\nDue to road construction, some paths will be closed.";
      date = Time.now();
      category = "Alert";
    },
    {
      title = "स्वास्थ्य शिविर - Health Camp";
      message = "स्वास्थ्य शिविर का आयोजन 5 जून को होगा।\nHealth camp will be organized on 5th June.";
      date = Time.now();
      category = "Event";
    },
  ]);

  let notifications = List.empty<{
    title : Text;
    message : Text;
    date : Time.Time;
    category : Text;
  }>();

  let seedDownloads = List.fromArray<{
    title : Text;
    description : Text;
    category : Text;
    fileUrl : Text;
  }>([
    {
      title = "आवास योजना फॉर्म - Housing Scheme Form";
      description = "सरकारी आवास योजना के लिए आवेदन करें।\nApply for government housing scheme.";
      category = "Forms";
      fileUrl = "https://example.com/housing_scheme.pdf";
    },
    {
      title = "जन्म प्रमाणपत्र आवेदन - Birth Certificate Application";
      description = "जन्म प्रमाणपत्र के लिए आवेदन फॉर्म।\nApplication form for birth certificate.";
      category = "Certificates";
      fileUrl = "https://example.com/birth_certificate.pdf";
    },
  ]);

  let downloads = List.empty<{
    title : Text;
    description : Text;
    category : Text;
    fileUrl : Text;
  }>();

  let contacts = Map.empty<Nat, {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    subject : Text;
  }>();
  var contactIdCounter = 0;

  let villageInfo = {
    population = 3500;
    area = 12.5;
    households = 650;
    wards = 8;
    villageName = "परसादीवान - Parsadiwan";
    district = "जौनपुर - Jaunpur";
    state = "उत्तर प्रदेश - Uttar Pradesh";
  };

  public shared ({ caller }) func initialize() : async () {
    if (notifications.isEmpty() and downloads.isEmpty()) {
      notifications.addAll(seedNotifications.values());
      downloads.addAll(seedDownloads.values());
    };
  };

  public query ({ caller }) func getNotifications() : async [{
    title : Text;
    message : Text;
    date : Time.Time;
    category : Text;
  }] {
    notifications.toArray();
  };

  public query ({ caller }) func getDownloads() : async [{
    title : Text;
    description : Text;
    category : Text;
    fileUrl : Text;
  }] {
    downloads.toArray();
  };

  public query ({ caller }) func getVillageInfo() : async {
    population : Nat;
    area : Float;
    households : Nat;
    wards : Nat;
    villageName : Text;
    district : Text;
    state : Text;
  } {
    villageInfo;
  };

  public shared ({ caller }) func submitContactForm(name : Text, phone : Text, email : Text, message : Text, subject : Text) : async () {
    let contact = {
      name;
      phone;
      email;
      message;
      subject;
    };
    contacts.add(contactIdCounter, contact);
    contactIdCounter += 1;
  };

  public query ({ caller }) func getContacts() : async [{
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    subject : Text;
  }] {
    contacts.values().toArray();
  };
};
